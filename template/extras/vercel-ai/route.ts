import { streamText, UIMessage, convertToModelMessages } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: "openai/gpt-5.2-chat-latest", // or any other model you want to use
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}