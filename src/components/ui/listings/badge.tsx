// src/components/ui/badge.tsx
import { type HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Badge({ className = '', children, ...props }: BadgeProps) {
  return (
    <div 
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}