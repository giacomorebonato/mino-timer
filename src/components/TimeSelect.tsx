import { Select } from '@chakra-ui/react'
import React from 'react'

const seconds = [] as number[]

for (let i = 1; i < 24; i++) {
  seconds.push(i * 5)
}

export const TimeSelect: React.FC<React.SelectHTMLAttributes<
  HTMLSelectElement
>> = ({ id, value, onChange }) => (
  <Select
    placeholder='Select exercise'
    isRequired
    onChange={onChange}
    value={value}
    id={id}
  >
    {seconds.map((second) => (
      <option key={`${id}-${second}`} value={second}>
        {second} seconds
      </option>
    ))}
  </Select>
)
