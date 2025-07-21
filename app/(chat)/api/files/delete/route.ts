import { auth } from "@/app/(auth)/auth";
import { deleteChunksByFilePath } from "@/app/db";
import { head, del } from "@vercel/blob";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);

  let session = await auth();

  if (!session) {
    return Response.redirect("/login");
  }

  const { user } = session;

  if (!user || !user.email) {
    return Response.redirect("/login");
  }

  if (request.body === null) {
    return new Response("Request body is empty", { status: 400 });
  }

  const fileurl = searchParams.get("fileurl");

  if (fileurl === null) {
    return new Response("File url not provided", { status: 400 });
  }

  // Check if blob token is configured
  const isBlobAvailable = process.env.BLOB_READ_WRITE_TOKEN && 
    process.env.BLOB_READ_WRITE_TOKEN !== 'placeholder-blob-token' &&
    !process.env.BLOB_READ_WRITE_TOKEN.includes('placeholder');

  if (!isBlobAvailable) {
    console.warn('Blob storage not configured - file deletion disabled');
    return new Response("File storage not configured", { status: 503 });
  }

  try {
    const { pathname } = await head(fileurl);

    if (!pathname.startsWith(user.email)) {
      return new Response("Unauthorized", { status: 400 });
    }

    await del(fileurl);
    await deleteChunksByFilePath({ filePath: pathname });

    return Response.json({});
  } catch (error) {
    console.error('File deletion error:', error);
    return new Response("File deletion failed", { status: 500 });
  }
}
