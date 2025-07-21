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

// Function to upload text content directly
async function uploadTextDocument(filename: string, content: string) {
  console.log(`📄 Processing: ${filename}`);

  try {
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

async function uploadKCADocuments() {
  console.log("🎓 Starting KCA University document upload...");

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

  let totalChunks = 0;

  // Instructions for adding your documents
  console.log("\n📋 HOW TO ADD YOUR KCA UNIVERSITY DOCUMENTS:");
  console.log("1. Copy your document text and paste it in the sections below");
  console.log("2. Replace the placeholder content with your actual documents");
  console.log("3. Run this script to upload to the knowledge base\n");

  // Sample KCA University documents - REPLACE THESE WITH YOUR ACTUAL CONTENT
  const kcaDocuments = [
    {
      filename: "kca-university-overview.txt",
      content: `
# KCA University Overview

## About KCA University
KCA University is a chartered private university in Kenya, established to provide quality higher education.

## Mission Statement
To provide quality education and training that is responsive to the needs of society.

## Vision
To be a leading university in Africa providing quality education and research.

## Core Values
- Excellence in education
- Innovation and creativity
- Integrity and professionalism
- Social responsibility

## Campus Locations
- Main Campus: Ruaraka, Nairobi
- Other campuses and learning centers across Kenya

## Academic Programs
KCA University offers various undergraduate and postgraduate programs in:
- Business and Economics
- Information Technology
- Education
- Social Sciences
- Engineering

REPLACE THIS CONTENT WITH YOUR ACTUAL KCA UNIVERSITY OVERVIEW DOCUMENT
      `
    },
    {
      filename: "admission-requirements.txt",
      content: `
# KCA University Admission Requirements

## Undergraduate Programs

### Minimum Entry Requirements
- KCSE mean grade of C+ (plus) or equivalent
- Specific subject requirements vary by program

### Application Process
1. Complete online application form
2. Submit required documents
3. Pay application fee
4. Attend interview if required

### Required Documents
- KCSE certificate or equivalent
- Birth certificate
- National ID copy
- Passport photos
- Medical certificate

## Postgraduate Programs

### Master's Degree Requirements
- Bachelor's degree from recognized institution
- Minimum second class honors (lower division)
- Professional experience may be considered

### PhD Requirements
- Master's degree in relevant field
- Research proposal
- Academic transcripts

REPLACE THIS CONTENT WITH YOUR ACTUAL ADMISSION REQUIREMENTS DOCUMENT
      `
    },
    {
      filename: "academic-calendar.txt",
      content: `
# KCA University Academic Calendar

## Semester System
KCA University operates on a semester system with three semesters per academic year.

## Academic Year Structure
- Semester 1: January - April
- Semester 2: May - August  
- Semester 3: September - December

## Important Dates
### Registration
- Early registration: 2 weeks before semester start
- Late registration: First week of semester
- Add/Drop period: First two weeks

### Examinations
- Mid-semester exams: Week 7-8
- Final examinations: Week 15-16
- Supplementary exams: 4 weeks after results

### Holidays and Breaks
- Mid-semester break: 1 week
- Inter-semester break: 2-3 weeks
- Annual holiday: December - January

REPLACE THIS CONTENT WITH YOUR ACTUAL ACADEMIC CALENDAR DOCUMENT
      `
    },
    {
      filename: "student-services.txt",
      content: `
# KCA University Student Services

## Academic Support Services
- Library services and resources
- Computer labs and IT support
- Academic advising and counseling
- Tutoring and study groups

## Student Life Services
- Student accommodation
- Dining services and cafeteria
- Health and wellness center
- Sports and recreation facilities

## Financial Services
- Student loans and bursaries
- Scholarship opportunities
- Payment plans and options
- Financial aid counseling

## Career Services
- Career guidance and counseling
- Job placement assistance
- Internship coordination
- Alumni network

## Student Organizations
- Student government
- Academic clubs and societies
- Sports teams and clubs
- Cultural and social groups

REPLACE THIS CONTENT WITH YOUR ACTUAL STUDENT SERVICES DOCUMENT
      `
    },
    {
      filename: "fees-structure.txt",
      content: `
# KCA University Fees Structure

## Undergraduate Programs

### Business and Economics
- Tuition per semester: [Amount]
- Registration fee: [Amount]
- Examination fee: [Amount]
- Library fee: [Amount]

### Information Technology
- Tuition per semester: [Amount]
- Lab fee: [Amount]
- Registration fee: [Amount]
- Examination fee: [Amount]

### Education
- Tuition per semester: [Amount]
- Teaching practice fee: [Amount]
- Registration fee: [Amount]
- Examination fee: [Amount]

## Postgraduate Programs

### Master's Programs
- Tuition per semester: [Amount]
- Research fee: [Amount]
- Thesis supervision fee: [Amount]

### PhD Programs
- Tuition per semester: [Amount]
- Research fee: [Amount]
- Dissertation supervision fee: [Amount]

## Payment Information
- Payment methods accepted
- Payment deadlines
- Late payment penalties
- Refund policies

REPLACE THIS CONTENT WITH YOUR ACTUAL FEES STRUCTURE DOCUMENT
      `
    }
  ];

  // Process each document
  for (const doc of kcaDocuments) {
    const chunksAdded = await uploadTextDocument(doc.filename, doc.content);
    totalChunks += chunksAdded;
  }

  await connection.end();
  
  console.log("\n🎉 KCA University document upload completed!");
  console.log(`📊 Summary:`);
  console.log(`   • Uploaded ${kcaDocuments.length} documents`);
  console.log(`   • Created ${totalChunks} searchable chunks`);
  console.log(`   • Documents are now accessible to all students`);
  
  console.log("\n🎓 Students can now ask questions like:");
  console.log("   • 'What are the admission requirements for KCA University?'");
  console.log("   • 'When does the next semester start?'");
  console.log("   • 'What student services are available?'");
  console.log("   • 'How much are the fees for IT programs?'");
  console.log("   • 'What programs does KCA University offer?'");
}

// Connect to database
const connection = postgres(process.env.POSTGRES_URL!, { max: 1 });
const db = drizzle(connection);

// Run the upload
uploadKCADocuments().catch((error) => {
  console.error("❌ Upload failed:", error);
  process.exit(1);
});