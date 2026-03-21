import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/shared/components/ui/spinner";
import { cn } from "@/shared/libs/utils";
import type { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<typeof Button> {
  loading?: boolean;
}

export default function AppButton({ loading, children, className, variant, ...props }: ButtonProps) {
  return (
    <Button disabled={loading} variant={variant} className={cn(variant === "outline" && "text-[#4A90E2]", className)} {...props}>
      {loading && <Spinner />}
      {children}
    </Button>
  );
}
