import { colors, radius, spacing } from '@zooai/cloud-brand'
import type { ButtonHTMLAttributes } from 'react'

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      style={{
        background: colors.primary,
        color: '#fff',
        border: 'none',
        padding: `${spacing.sm} ${spacing.md}`,
        borderRadius: radius.md,
        cursor: 'pointer',
        fontWeight: 500,
        ...props.style,
      }}
    />
  )
}
