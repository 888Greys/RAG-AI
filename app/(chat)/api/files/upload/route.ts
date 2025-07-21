import { auth } from "@/app/(auth)/auth";
import { insertChunks } from "@/app/db";
import { getPdfContentFromUrl } from "@/utils/pdf";
import { google } from "@ai-sdk/google";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { put } from "@vercel/blob";
import { embedMany } from "ai";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  let session = await auth();

  if (!session) {
    return Response.redirect("/login");
  }

  const { user } = session;

  if (!user) {
    return Response.redirect("/login");
  }

  if (request.body === null) {
    return new Response("Request body is empty", { status: 400 });
  }

  // Check if blob token is configured
  const isBlobAvailable = process.env.BLOB_READ_WRITE_TOKEN && 
    process.env.BLOB_READ_WRITE_TOKEN !== 'placeholder-blob-token' &&
    !process.env.BLOB_READ_WRITE_TOKEN.includes('placeholder');

  if (!isBlobAvailable) {
    console.warn('Blob storage not configured - file upload disabled');
    return new Response("File storage not configured", { status: 503 });
  }

  // Check if Google API key is configured
  const isGoogleAIAvailable = process.env.GOOGLE_GENERATIVE_AI_API_KEY && 
    process.env.GOOGLE_GENERATIVE_AI_API_KEY !== 'placeholder-google-api-key' &&
    !process.env.GOOGLE_GENERATIVE_AI_API_KEY.includes('placeholder');

  if (!isGoogleAIAvailable) {
    console.warn('Google AI API key not configured - file processing disabled');
    return new Response("AI processing not configured", { status: 503 });
  }

  try {
    const { downloadUrl } = await put(`${user.email}/${filename}`, request.body, {
      access: "public",
    });

    const content = await getPdfContentFromUrl(downloadUrl);
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    const chunkedContent = await textSplitter.createDocuments([content]);

    const { embeddings } = await embedMany({
      model: google.textEmbedding("text-embedding-004"),
      values: chunkedContent.map((chunk) => chunk.pageContent),
    });

    await insertChunks({
      chunks: chunkedContent.map((chunk, i) => ({
        id: `${user.email}/${filename}/${i}`,
        filePath: `${user.email}/${filename}`,
        content: chunk.pageContent,
        embedding: embeddings[i],
      })),
    });

    return Response.json({});
  } catch (error) {
    console.error('File upload error:', error);
    return new Response("File upload failed", { status: 500 });
  }
}
