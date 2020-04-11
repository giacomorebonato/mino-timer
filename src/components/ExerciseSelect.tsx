import { Select } from '@chakra-ui/core'
import React from 'react'

const exercises = [
  'Crunches',
  'Jumping Jacks',
  'Burpies',
  'Push ups',
  'Reverse Crunches',
  'Russian twists',
  'Squats'
]

export const ExerciseSelect: React.FC<React.SelectHTMLAttributes<
  HTMLSelectElement
>> = ({ onChange }) => (
  <Select placeholder='Select exercise' isRequired onChange={onChange}>
    {exercises.map((exercise) => (
      <option key={exercise}>{exercise}</option>
    ))}
  </Select>
)
