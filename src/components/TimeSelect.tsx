import { Select } from '@chakra-ui/core'
import React from 'react'

const seconds = [] as number[]

for (let i = 0; i < 24; i++) {
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
  >
    {seconds.map((exercise) => (
      <option key={`${id}-${exercise}`}>{exercise}</option>
    ))}
  </Select>
)
