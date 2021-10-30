import React from 'react'
import { Select } from 'antd'
import { Raw } from '@/types'

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
  value: Raw | null | undefined
  onChange: (value?: number) => void
  defaultOptionName?: string
  options?: { name: string; id: number }[]
}

const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...selectProps } = props

  return (
    <Select
      {...selectProps}
      value={options?.length ? toNunber(value) : 0}
      onChange={(value) => onChange(toNunber(value) || undefined)}
    >
      {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  )
}

const toNunber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))

export default IdSelect
