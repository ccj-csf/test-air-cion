'use client';
import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { BaseButton } from '../base-button';

interface DialogProps {
  children?: React.ReactNode;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  onConfirm?: () => Promise<void> | void;
  onCancel?: () => void;
  showDefaultButtons?: boolean;
}

export interface DialogRef {
  open: () => void;
  close: () => void;
}

const BaseDialog = React.forwardRef<DialogRef, DialogProps>(
  ({ children, onConfirm, onCancel, showDefaultButtons = true, title, description }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useImperativeHandle(ref, () => ({
      open: () => {
        buttonRef.current?.click();
      },
      close: () => {
        buttonRef.current?.click();
      },
    }));

    const handleConfirm = async () => {
      if (onConfirm) {
        try {
          const result = onConfirm(); // 可能是 Promise 或 void
          if (result instanceof Promise) {
            setIsLoading(true);
            await result; // 等待 Promise 完成
            buttonRef.current?.click();
            setIsLoading(false);
          }
        } finally {
          if (!(onConfirm() instanceof Promise)) {
            buttonRef.current?.click(); // 如果不是 Promise，执行完毕后关闭对话框
          }
        }
      } else {
        buttonRef.current?.click();
      }
    };

    const handleCancel = async () => {
      onCancel?.();
      buttonRef.current?.click();
    };

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button ref={buttonRef} variant="outline" className="hidden">
            Show Dialog
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          {title && <h3 className="font-700 text-24">{title}</h3>}
          {description && <p className="text-gray-100">{description}</p>}
          {children}
          {showDefaultButtons && (
            <section className="grid grid-cols-2 gap-8">
              <BaseButton onClick={handleCancel} variant="outline">
                Cancel
              </BaseButton>
              <BaseButton onClick={handleConfirm} loading={isLoading}>
                Confirm
              </BaseButton>
            </section>
          )}
        </AlertDialogContent>
      </AlertDialog>
    );
  },
);

BaseDialog.displayName = 'BaseDialog';

export default BaseDialog;
