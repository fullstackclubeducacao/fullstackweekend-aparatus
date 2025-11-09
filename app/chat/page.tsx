"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ChatMessage } from "./_components/chat-message";
import { ChatInput } from "./_components/chat-input";

const INITIAL_MESSAGES = [
  {
    id: "system-welcome",
    role: "system" as const,
    parts: [
      {
        type: "text" as const,
        text: "Seu assistente de agendamentos está online.",
      },
    ],
  },
  {
    id: "assistant-welcome",
    role: "assistant" as const,
    parts: [
      {
        type: "text" as const,
        text: "Olá! Sou o Aparatus, seu assistente pessoal.\n\nEstou aqui para te auxiliar a agendar seu corte ou barba, encontrar as barbearias disponíveis perto de você e responder às suas dúvidas.",
      },
    ],
  },
];

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage({
        text: message,
      });
      setMessage("");
    }
  };

  const isLoading = status === "streaming" || status === "submitted";

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden rounded-[20px] bg-[var(--background)]">
      <div className="flex w-[390px] items-center justify-between pb-0 pl-5 pr-5 pt-6">
        <Link href="/">
          <ChevronLeft className="size-6 shrink-0" />
        </Link>
        <p className="font-merriweather whitespace-pre text-nowrap text-[20px] italic leading-[1.4] tracking-[-1px] text-[var(--foreground)]">
          Aparatus
        </p>
        <div className="flex items-center justify-end gap-[15px]" />
      </div>

      <div className="flex-1 overflow-y-auto pb-24 [&::-webkit-scrollbar]:hidden">
        {messages.length === 0
          ? INITIAL_MESSAGES.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))
          : messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        input={message}
        onChange={(e) => setMessage(e.target.value)}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
