"use client";

import { Mic, Send } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";

interface ChatInputProps {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export const ChatInput = ({
  input,
  onChange,
  onSubmit,
  isLoading,
}: ChatInputProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <div className="bg-muted absolute bottom-0 left-0 flex w-full flex-col gap-2.5 p-5">
      <div className="flex w-full gap-2">
        <Input
          value={input}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem"
          className="bg-background grow basis-0 rounded-full px-4 py-3 text-sm"
          disabled={isLoading}
        />
        <Button
          size="icon"
          className="bg-primary size-[42px] shrink-0 rounded-full p-2.5"
          disabled
        >
          <Mic className="size-5 text-white" />
        </Button>
        <Button
          size="icon"
          className="bg-primary size-[42px] shrink-0 rounded-full p-2.5"
          onClick={onSubmit}
          disabled={isLoading || !input.trim()}
        >
          <Send className="size-5 text-white" />
        </Button>
      </div>
    </div>
  );
};
