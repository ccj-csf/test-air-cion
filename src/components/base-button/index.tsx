'use client';
import { cn } from '@/utils/component';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  customClasses?: string;
}

const buttonVariants = cva(
  'inline-flex items-center  text-white rounded-14 justify-center whitespace-nowrap rounded-md text-sm font-400 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-l  from-[#F3AC3D] to-[#E5824D]  hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 ',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground ',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 ',
        ghost: 'hover:bg-accent hover:text-accent-foreground ',
        link: 'text-primary underline-offset-4 hover:underline ',
        custom: `bg-blue  `,
      },
      size: {
        default: 'h-[46px] px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const BaseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      customClasses,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className, customClasses)}
        ref={ref}
        {...props}
        disabled={props.disabled || loading} // 如果loading, 自动禁用按钮
      >
        {loading ? (
          <div className="flex w-full items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          children
        )}
      </Comp>
    );
  },
);

BaseButton.displayName = 'Button';

export { BaseButton, buttonVariants };
