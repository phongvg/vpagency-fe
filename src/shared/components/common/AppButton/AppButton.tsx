import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/shared/components/ui/spinner";
import type { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<typeof Button> {
  loading?: boolean;
}

export default function AppButton({ loading, children, ...props }: ButtonProps) {
  return (
    <Button disabled={loading} className='text-primary' {...props}>
      {loading && <Spinner />}
      {children}
    </Button>
  );
}
