import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/shared/components/ui/spinner";
import type { ButtonProps } from "./AppButton.type";

export default function AppButton({ loading, children, ...props }: ButtonProps) {
  return (
    <Button disabled={loading} {...props}>
      {loading && <Spinner />}
      {children}
    </Button>
  );
}
