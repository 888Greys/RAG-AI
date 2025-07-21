import { auth } from "@/app/(auth)/auth";
import { redirect } from "next/navigation";
import { Chat } from "@/components/chat";
import { generateId } from "ai";

// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic';

export default async function Page() {
  const session = await auth();
  
  // If user is not authenticated, redirect to landing page
  if (!session) {
    redirect("/landing");
  }
  
  // If authenticated, show the chat interface
  return <Chat id={generateId()} initialMessages={[]} session={session} />;
}