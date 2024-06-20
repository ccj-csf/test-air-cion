'use client';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';

import { cn } from '@/utils/component';

interface BaseProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  max?: number; // 新增 max 属性
  value?: number; // 明确标注 value 也是属性之一
  backgroundColor?: string; // 背景颜色
  indicatorColor?: string; // 指示器颜色
  height?: string | number; // 高度，可以是数字或字符串（例如 '4px', '1rem'）
}

const BaseProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  BaseProgressProps // 使用扩展后的属性类型
>(
  (
    {
      className,
      value = 0,
      max = 100,
      indicatorColor = 'bg-[#fce088]',
      height = 'h-4',
      backgroundColor = 'bg-[#c59e65]',
      ...props
    },
    ref, // 默认 max 为 100，value 默认为 0
  ) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        `relative ${height} w-full overflow-hidden rounded-full ${backgroundColor}`,
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={`h-full w-full flex-1  ${indicatorColor}  transition-all`}
        style={{ transform: `translateX(-${100 - (value / max) * 100}%)` }} // 更新 transform 计算方式
      />
    </ProgressPrimitive.Root>
  ),
);

BaseProgress.displayName = ProgressPrimitive.Root.displayName;

export { BaseProgress };
