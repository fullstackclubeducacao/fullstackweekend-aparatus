import { streamText, convertToModelMessages } from "ai";
import { google } from "@ai-sdk/google";

export const POST = async (request: Request) => {
  const { messages } = await request.json();
  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: `Você é o Aparatus AI, um assistente virtual de agendamento de barbearias`,
    messages: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
};
