import { customModel } from "@/ai";
import { auth } from "@/app/(auth)/auth";
import { createMessage } from "@/app/db";
import { streamText } from "ai";

export async function POST(request: Request) {
  const { id, messages, selectedFilePathnames } = await request.json();

  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Check if Groq API key is configured
  const isGroqAvailable = process.env.GROQ_API_KEY && 
    process.env.GROQ_API_KEY !== 'placeholder-groq-api-key' &&
    !process.env.GROQ_API_KEY.includes('placeholder');

  if (!isGroqAvailable) {
    console.warn('Groq API key not configured - chat disabled');
    return new Response("AI chat not configured", { status: 503 });
  }

  try {
    const result = streamText({
      model: customModel,
      system:
        "you are a friendly assistant! keep your responses concise and helpful.",
      messages,
      experimental_providerMetadata: {
        files: {
          selection: selectedFilePathnames,
        },
      },
      onFinish: async ({ text }) => {
        await createMessage({
          id,
          messages: [...messages, { role: "assistant", content: text }],
          author: session.user?.email!,
        });
      },
      experimental_telemetry: {
        isEnabled: true,
        functionId: "stream-text",
      },
    });

    return result.toDataStreamResponse({});
  } catch (error) {
    console.error('Chat error:', error);
    return new Response("Chat failed", { status: 500 });
  }
}
