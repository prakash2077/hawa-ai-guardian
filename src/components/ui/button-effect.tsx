
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ButtonEffectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children: ReactNode;
  sparkles?: boolean;
}

export function ButtonEffect({
  className,
  variant = "default",
  size = "default",
  children,
  sparkles = false,
  ...props
}: ButtonEffectProps) {
  return (
    <div className="relative group">
      {sparkles && (
        <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition duration-300">
          <div className="absolute -top-2 -left-3">
            <div className="w-2 h-2 bg-yellow-300 rounded-full animate-sparkle" />
          </div>
          <div className="absolute -top-1 left-8">
            <div className="w-1.5 h-1.5 bg-pink-300 rounded-full animate-sparkle [animation-delay:200ms]" />
          </div>
          <div className="absolute top-8 -right-3">
            <div className="w-2.5 h-2.5 bg-blue-300 rounded-full animate-sparkle [animation-delay:500ms]" />
          </div>
        </div>
      )}
      <Button
        className={cn(
          "transition-all duration-300 transform hover:scale-105 active:scale-95",
          sparkles && "hover:shadow-md hover:shadow-primary/20",
          className
        )}
        variant={variant}
        size={size}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
}
