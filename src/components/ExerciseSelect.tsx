import { Select } from '@chakra-ui/core'
import React from 'react'
import exercises from './exercises.json'

export const ExerciseSelect: React.FC<React.SelectHTMLAttributes<
  HTMLSelectElement
>> = ({ onChange, value }) => (
  <Select
    placeholder='Select exercise'
    isRequired
    onChange={onChange}
    value={value}
  >
    {exercises.exercises.map(({ id, name }) => (
      <option key={`exercise-${id}`}>{name}</option>
    ))}
  </Select>
)
