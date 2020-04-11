import { Select } from '@chakra-ui/core'
import React from 'react'

const exercises = [
  'Crunch',
  'Jumping Jacks',
  'Burpies',
  'Reverse Crunch',
  'Russian twists',
  'Squats'
]

export const ExerciseSelect: React.FC<React.SelectHTMLAttributes<
  HTMLSelectElement
>> = () => (
  <Select placeholder='Select exercise' isRequired>
    {exercises.map((exercise) => (
      <option key={exercise}>{exercise}</option>
    ))}
  </Select>
)
