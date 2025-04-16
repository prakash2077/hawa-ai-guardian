
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "verified" | "hallucination" | "filtered" | "default";
}

export function Tag({
  className,
  variant = "default",
  children,
  ...props
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-hawa-success text-white": variant === "verified",
          "bg-hawa-warning text-white": variant === "hallucination",
          "bg-hawa-neutral text-white": variant === "filtered",
          "bg-slate-200 text-slate-700": variant === "default",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
