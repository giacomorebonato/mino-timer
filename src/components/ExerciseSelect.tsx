import { Select } from '@chakra-ui/core'
import React from 'react'

const exercises = [
  'Crunches',
  'Jumping Jacks',
  'Jumping Jacks to the Step',
  'Burpees',
  'Froggy Jumps',
  'Front Kick Lunge',
  'Jogging in Place',
  'Jogging with High Knees',
  'Long Jumps',
  'Lunges',
  'Mountain Climbers',
  'Plyo Lunges',
  'Plyo Jacks',
  'Prisoner Squat Jumps',
  'Push ups',
  'Reverse Crunches',
  'Russian twists',
  'Side to Side Jumping Lunges',
  'Squat Jumps',
  'Squats',
  'Toe Taps with Jumps'
]

export const ExerciseSelect: React.FC<React.SelectHTMLAttributes<
  HTMLSelectElement
>> = ({ onChange, value }) => (
  <Select
    placeholder='Select exercise'
    isRequired
    onChange={onChange}
    value={value}
  >
    {exercises.map((exercise) => (
      <option key={exercise}>{exercise}</option>
    ))}
  </Select>
)
