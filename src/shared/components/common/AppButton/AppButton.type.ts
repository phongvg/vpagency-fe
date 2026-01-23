import type { Button } from "@/shared/components/ui/button";
import type { ComponentProps } from "react";

export type ButtonProps = ComponentProps<typeof Button> & {
  loading?: boolean;
};
