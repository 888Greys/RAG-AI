import { auth } from "@/app/(auth)/auth";
import { insertChunks } from "@/app/db";
import { google } from "@ai-sdk/google";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { embedMany } from "ai";

export async function POST(request: Request) {
  let session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { user } = session;
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Check if Google API key is configured for embeddings
  const isGoogleAIAvailable = process.env.GOOGLE_GENERATIVE_AI_API_KEY && 
    process.env.GOOGLE_GENERATIVE_AI_API_KEY !== 'placeholder-google-api-key' &&
    !process.env.GOOGLE_GENERATIVE_AI_API_KEY.includes('placeholder');

  if (!isGoogleAIAvailable) {
    console.warn('Google AI API key not configured - file processing disabled');
    return new Response("AI processing not configured", { status: 503 });
  }

  try {
    const { filename, content } = await request.json();

    if (!filename || !content) {
      return new Response("Filename and content are required", { status: 400 });
    }

    // Split the content into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200, // Add overlap for better context
    });
    const chunkedContent = await textSplitter.createDocuments([content]);

    // Generate embeddings for all chunks
    const { embeddings } = await embedMany({
      model: google.textEmbedding("text-embedding-004"),
      values: chunkedContent.map((chunk) => chunk.pageContent),
    });

    // Store chunks in database with shared access (no user-specific path)
    await insertChunks({
      chunks: chunkedContent.map((chunk, i) => ({
        id: `shared/${filename}/${i}`,
        filePath: `shared/${filename}`, // Shared across all users
        content: chunk.pageContent,
        embedding: embeddings[i],
      })),
    });

    return Response.json({ 
      success: true, 
      message: `Document "${filename}" processed and added to knowledge base`,
      chunks: chunkedContent.length 
    });

  } catch (error) {
    console.error('File upload error:', error);
    return new Response("File upload failed", { status: 500 });
  }
}