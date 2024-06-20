'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CircleHelp } from 'lucide-react';
import React from 'react';

interface BasePopoverProps {
  children?: React.ReactNode;
  content: React.ReactNode | string;
}

const BasePopover: React.FC<BasePopoverProps> = ({ children, content }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children || <CircleHelp size={16} color="#fff" />}</PopoverTrigger>
      <PopoverContent className="w-80">
        {typeof content === 'string' ? (
          <div className="p-2">
            <p className="text-sm text-muted-foreground">{content}</p>
          </div>
        ) : (
          content
        )}
      </PopoverContent>
    </Popover>
  );
};

export default BasePopover;
