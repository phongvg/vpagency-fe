import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { ConfirmContext, type ConfirmOptions } from "@/shared/contexts/ConfirmContext";
import { useState, type ReactNode } from "react";

type State = {
  open: boolean;
  resolve?: (value: boolean) => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
};

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({ open: false });

  const confirm = (options?: ConfirmOptions) =>
    new Promise<boolean>((resolve) => {
      setState({
        open: true,
        resolve,
        title: options?.title ?? "Xác nhận",
        description: options?.description ?? "Bạn có chắc chắn với hành động này?",
        confirmText: options?.confirmText ?? "Tôi chắc chắn",
        cancelText: options?.cancelText ?? "Huỷ",
      });
    });

  const handleClose = (result: boolean) => {
    state.resolve?.(result);
    setState({ open: false });
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      <AlertDialog open={state.open} onOpenChange={handleClose}>
        <AlertDialogContent className='max-w-[340px]'>
          <AlertDialogHeader>
            <AlertDialogTitle className='font-bold text-red-600 text-center'>{state.title}</AlertDialogTitle>

            <AlertDialogDescription className='text-center'>{state.description}</AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className='grid grid-cols-2'>
            <AlertDialogCancel onClick={() => handleClose(false)}>{state.cancelText}</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleClose(true)} className='text-primary'>
              {state.confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmContext.Provider>
  );
}
