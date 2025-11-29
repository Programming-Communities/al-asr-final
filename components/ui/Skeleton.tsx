'use client'

import React from 'react'
import { cn } from '@/utils/helpers'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
  animation?: 'pulse' | 'wave' | 'none'
  height?: number | string
  width?: number | string
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = 'text',
      animation = 'pulse',
      height,
      width,
      style,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'bg-gray-200 dark:bg-gray-700 rounded'
    
    const variants = {
      text: 'h-4 rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-lg',
    }

    const animations = {
      pulse: 'animate-pulse',
      wave: 'animate-wave',
      none: '',
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          animations[animation],
          className
        )}
        style={{
          height,
          width,
          ...style,
        }}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

export default Skeleton
