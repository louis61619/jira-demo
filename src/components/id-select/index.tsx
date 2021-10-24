import React from 'react'
import { Raw } from '@/types'

interface IdSelectProps {
  value: Raw | null | undefined
  onChange: (value?: number) => void
  defaultOptionName?: string
  options?: { name: string; id: number }[]
}

const IdSelect = (props: IdSelectProps) => {
  return <div></div>
}

export default IdSelect
