import { UIMessage } from "ai";
import { Bot } from "lucide-react";

interface ChatMessageProps {
  message: UIMessage;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  const content = message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");

  if (isSystem) {
    return (
      <div className="flex w-full flex-col gap-3 px-5 pb-0 pt-6">
        <div className="flex w-full flex-col gap-2.5 rounded-xl border border-[var(--border)] p-3">
          <div className="flex w-full items-center justify-center gap-2.5">
            <p className="grow basis-0 text-center text-sm font-normal leading-[1.4] text-[var(--muted-foreground)]">
              {content}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex w-full flex-col items-end gap-3 pb-0 pl-10 pr-5 pt-6">
        <div className="flex h-10 items-center gap-2.5 rounded-full bg-[var(--secondary)] px-4 py-3">
          <p className="whitespace-pre text-sm font-normal leading-[1.4] text-[var(--foreground)]">
            {content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-3 pb-0 pl-3 pr-14 pt-6">
      <div className="flex w-full gap-2">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[rgba(48,92,58,0.12)]">
          <Bot className="size-3.5 text-[var(--primary)]" />
        </div>
        <p className="grow basis-0 text-sm font-normal leading-[1.4] text-[var(--foreground)]">
          {content}
        </p>
      </div>
    </div>
  );
};
