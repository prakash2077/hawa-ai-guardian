
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Tag } from "./tag";

interface ChatBubbleProps {
  content: string;
  sender: "user" | "ai" | "hawa";
  status?: "verified" | "hallucination" | "filtered";
  className?: string;
  children?: ReactNode;
}

export function ChatBubble({
  content,
  sender,
  status,
  className,
  children,
}: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1",
        sender === "user" ? "items-end" : "items-start",
        className
      )}
    >
      <div
        className={cn(
          "rounded-3xl px-5 py-3 shadow-sm max-w-[85%]",
          {
            "bg-primary text-white": sender === "user",
            "bg-hawa-gray text-gray-800": sender === "ai",
            "bg-hawa-lavender text-gray-800": sender === "hawa",
          }
        )}
      >
        <p className="text-sm sm:text-base whitespace-pre-wrap">{content}</p>
        {children}
      </div>
      
      {status && (
        <div className="flex space-x-2 px-2">
          {status === "verified" && <Tag variant="verified">✅ Verified</Tag>}
          {status === "hallucination" && (
            <Tag variant="hallucination">⚠️ Hallucination</Tag>
          )}
          {status === "filtered" && <Tag variant="filtered">🚫 Safety-Filtered</Tag>}
        </div>
      )}
    </div>
  );
}
