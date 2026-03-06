import { cn } from "@/lib/utils";

interface ScreenWrapperProps {
  children: React.ReactNode;
  className?: string;
  withBottomTab?: boolean;
}

export function ScreenWrapper({
  children,
  className,
  withBottomTab = true,
}: ScreenWrapperProps) {
  return (
    <main
      className={cn(
        "flex-1 screen-padding",
        withBottomTab && "content-bottom",
        className
      )}
    >
      {children}
    </main>
  );
}
