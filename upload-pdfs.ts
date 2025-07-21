import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { google } from "@ai-sdk/google";
import { embedMany } from "ai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { chunk } from "./schema";
import dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import pdf from "pdf-parse";

dotenv.config({
  path: ".env",
});

// Function to extract text from PDF
async function extractTextFromPDF(pdfPath: string): Promise<string> {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error(`Error reading PDF ${pdfPath}:`, error);
    throw error;
  }
}

// Function to upload PDF content
async function uploadPDFDocument(filename: string, pdfPath: string) {
  console.log(`📄 Processing PDF: ${filename}`);

  try {
    // Extract text from PDF
    console.log(`   📖 Extracting text from PDF...`);
    const content = await extractTextFromPDF(pdfPath);
    
    if (!content.trim()) {
      console.log(`   ⚠️  No text found in ${filename}`);
      return 0;
    }

    // Split content into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunks = await textSplitter.createDocuments([content.trim()]);
    console.log(`   📝 Created ${chunks.length} chunks`);

    // Generate embeddings
    console.log(`   🧠 Generating embeddings...`);
    const { embeddings } = await embedMany({
      model: google.textEmbedding("text-embedding-004"),
      values: chunks.map((chunk) => chunk.pageContent),
    });

    console.log(`   ✅ Generated ${embeddings.length} embeddings`);

    // Prepare chunks for database insertion
    const chunksToInsert = chunks.map((chunkDoc, i) => ({
      id: `kca/${filename}/${i}`,
      filePath: `kca/${filename}`,
      content: chunkDoc.pageContent,
      embedding: embeddings[i],
    }));

    // Insert into database
    await db.insert(chunk).values(chunksToInsert);
    console.log(`   💾 Inserted ${chunksToInsert.length} chunks into database`);

    return chunksToInsert.length;
  } catch (error) {
    console.error(`   ❌ Error processing ${filename}:`, error);
    return 0;
  }
}

async function uploadKCAPDFs() {
  console.log("🎓 Starting KCA University PDF upload...");

  // Check environment variables
  if (!process.env.POSTGRES_URL) {
    console.error("❌ POSTGRES_URL not found in environment variables");
    process.exit(1);
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY || 
      process.env.GOOGLE_GENERATIVE_AI_API_KEY === 'placeholder-google-api-key') {
    console.error("❌ GOOGLE_GENERATIVE_AI_API_KEY not configured");
    process.exit(1);
  }

  // Connect to database
  const connection = postgres(process.env.POSTGRES_URL, { max: 1 });
  const db = drizzle(connection);

  console.log("✅ Connected to Supabase database");

  // Create pdfs directory if it doesn't exist
  const pdfsDir = path.join(process.cwd(), 'pdfs');
  if (!fs.existsSync(pdfsDir)) {
    fs.mkdirSync(pdfsDir);
    console.log("📁 Created 'pdfs' directory");
    console.log("📋 Please add your KCA University PDF files to the 'pdfs' folder and run this script again.");
    return;
  }

  // Get all PDF files from the pdfs directory
  const pdfFiles = fs.readdirSync(pdfsDir).filter(file => file.toLowerCase().endsWith('.pdf'));

  if (pdfFiles.length === 0) {
    console.log("📋 No PDF files found in 'pdfs' directory.");
    console.log("📁 Please add your KCA University PDF files to the 'pdfs' folder:");
    console.log("   • Admission requirements");
    console.log("   • Academic calendar");
    console.log("   • Student handbook");
    console.log("   • Fees structure");
    console.log("   • Course catalog");
    return;
  }

  let totalChunks = 0;

  // Process each PDF file
  for (const pdfFile of pdfFiles) {
    const pdfPath = path.join(pdfsDir, pdfFile);
    const filename = path.parse(pdfFile).name; // Remove .pdf extension
    
    const chunksAdded = await uploadPDFDocument(filename, pdfPath);
    totalChunks += chunksAdded;
  }

  await connection.end();
  
  console.log("\n🎉 KCA University PDF upload completed!");
  console.log(`📊 Summary:`);
  console.log(`   • Processed ${pdfFiles.length} PDF files`);
  console.log(`   • Created ${totalChunks} searchable chunks`);
  console.log(`   • Documents are now accessible to all students`);
  
  console.log("\n🎓 Students can now ask questions about:");
  pdfFiles.forEach(file => {
    console.log(`   • ${path.parse(file).name}`);
  });
}

// Connect to database
const connection = postgres(process.env.POSTGRES_URL!, { max: 1 });
const db = drizzle(connection);

// Run the upload
uploadKCAPDFs().catch((error) => {
  console.error("❌ Upload failed:", error);
  process.exit(1);
});