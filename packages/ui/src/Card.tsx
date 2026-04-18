import { colors, radius, spacing } from '@zooai/cloud-brand'
import type { HTMLAttributes } from 'react'

export function Card(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{
        background: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.lg,
        padding: spacing.lg,
        color: colors.fg,
        ...props.style,
      }}
    />
  )
}
