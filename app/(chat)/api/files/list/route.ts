import { auth } from "@/app/(auth)/auth";
import { list } from "@vercel/blob";

export async function GET() {
  let session = await auth();

  if (!session) {
    return Response.redirect("/login");
  }

  const { user } = session;

  if (!user) {
    return Response.redirect("/login");
  }

  // Check if blob token is configured
  const isBlobAvailable = process.env.BLOB_READ_WRITE_TOKEN && 
    process.env.BLOB_READ_WRITE_TOKEN !== 'placeholder-blob-token' &&
    !process.env.BLOB_READ_WRITE_TOKEN.includes('placeholder');

  if (!isBlobAvailable) {
    console.warn('Blob storage not configured - returning empty file list');
    return Response.json([]);
  }

  try {
    const { blobs } = await list({ prefix: user.email! });

    return Response.json(
      blobs.map((blob) => ({
        ...blob,
        pathname: blob.pathname.replace(`${user.email}/`, ""),
      })),
    );
  } catch (error) {
    console.error('Blob storage error:', error);
    return Response.json([]);
  }
}
