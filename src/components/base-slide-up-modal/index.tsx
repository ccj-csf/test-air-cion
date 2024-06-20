'use client';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import * as Dialog from '@radix-ui/react-dialog';
import * as React from 'react';

interface SlideUpModalProps {
  children: React.ReactNode;
}

export interface SlideUpModalRef {
  open: () => void;
  close: () => void;
}

const BaseSlideUpModal = React.forwardRef<SlideUpModalRef, SlideUpModalProps>(
  ({ children }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useImperativeHandle(ref, () => ({
      open: () => {
        buttonRef.current?.click();
      },
      close: () => {
        buttonRef.current?.click();
      },
    }));

    return (
      <Dialog.Root>
        <Drawer>
          <DrawerTrigger asChild>
            <Button ref={buttonRef} variant="outline" className="hidden">
              Open Drawer
            </Button>
          </DrawerTrigger>
          <DrawerContent className="pb-6">{children}</DrawerContent>
        </Drawer>
      </Dialog.Root>
    );
  },
);

// 设置 displayName
BaseSlideUpModal.displayName = 'BaseSlideUpModal';

export default BaseSlideUpModal;
