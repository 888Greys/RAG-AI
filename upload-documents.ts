import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { google } from "@ai-sdk/google";
import { embedMany } from "ai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { chunk } from "./schema";
import dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config({
  path: ".env",
});

// Sample documents to upload
const sampleDocuments = [
  {
    filename: "company-handbook.txt",
    content: `
# Company Handbook

## Remote Work Policy
Our company supports flexible remote work arrangements. Employees can work from home up to 3 days per week with manager approval. 

## Vacation Policy  
All full-time employees receive 15 days of paid vacation per year, increasing to 20 days after 3 years of service.

## Expense Reimbursement
Submit expense reports within 30 days of purchase. Approved categories include:
- Travel and accommodation
- Office supplies and equipment
- Professional development and training
- Client entertainment (with receipts)

## Performance Reviews
Annual performance reviews are conducted in January. Mid-year check-ins occur in July.

## Benefits
- Health insurance (company pays 80%)
- 401k matching up to 4%
- Professional development budget: $2000/year
- Flexible spending account available
    `
  },
  {
    filename: "technical-documentation.txt", 
    content: `
# Technical Documentation

## API Authentication
All API requests must include a valid JWT token in the Authorization header:
Authorization: Bearer <your-jwt-token>

## Database Schema
Our application uses PostgreSQL with the following main tables:
- users: Store user account information
- projects: Project metadata and settings
- tasks: Individual task items with status tracking

## Deployment Process
1. Create feature branch from main
2. Implement changes and write tests
3. Submit pull request for review
4. After approval, merge to main
5. Automatic deployment to staging
6. Manual promotion to production

## Error Handling
Use structured error responses:
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": {...}
  }
}

## Rate Limiting
API endpoints are rate limited to 1000 requests per hour per user.
    `
  },
  {
    filename: "product-specifications.txt",
    content: `
# Product Specifications

## Core Features
- Real-time collaboration
- Document version control
- Advanced search capabilities
- Role-based access control
- API integrations

## System Requirements
- Minimum 8GB RAM
- 50GB available storage
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)
- Stable internet connection (minimum 10 Mbps)

## Supported File Formats
- Documents: PDF, DOC, DOCX, TXT, MD
- Images: JPG, PNG, GIF, SVG
- Spreadsheets: XLS, XLSX, CSV
- Presentations: PPT, PPTX

## Security Features
- End-to-end encryption
- Two-factor authentication
- Single sign-on (SSO) support
- Regular security audits
- GDPR compliance

## Performance Metrics
- Page load time: <2 seconds
- API response time: <500ms
- Uptime: 99.9% SLA
- Concurrent users: Up to 10,000
    `
  }
];

async function uploadDocuments() {
  console.log("🚀 Starting document upload to Supabase...");

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

  // Process each document
  for (const doc of sampleDocuments) {
    console.log(`\n📄 Processing: ${doc.filename}`);

    try {
      // Split content into chunks
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const chunks = await textSplitter.createDocuments([doc.content.trim()]);
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
        id: `shared/${doc.filename}/${i}`,
        filePath: `shared/${doc.filename}`,
        content: chunkDoc.pageContent,
        embedding: embeddings[i],
      }));

      // Insert into database
      await db.insert(chunk).values(chunksToInsert);
      console.log(`   💾 Inserted ${chunksToInsert.length} chunks into database`);

    } catch (error) {
      console.error(`   ❌ Error processing ${doc.filename}:`, error);
    }
  }

  await connection.end();
  console.log("\n🎉 Document upload completed!");
  console.log("\n📋 Summary:");
  console.log(`   • Uploaded ${sampleDocuments.length} documents`);
  console.log(`   • Documents are now searchable by all users`);
  console.log(`   • Try asking questions about company policies, technical docs, or product specs`);
}

// Run the upload
uploadDocuments().catch((error) => {
  console.error("❌ Upload failed:", error);
  process.exit(1);
});