import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/shared/components/ui/spinner";
import { cn } from "@/shared/libs/utils";
import type { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<typeof Button> {
  loading?: boolean;
}

export default function AppButton({ loading, children, className, ...props }: ButtonProps) {
  return (
    <Button disabled={loading} className={cn("text-primary", className)} {...props}>
      {loading && <Spinner />}
      {children}
    </Button>
  );
}
