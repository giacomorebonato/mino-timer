import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text
} from '@chakra-ui/core'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { ExerciseSelect, Timer } from '../components'
import { useStore } from '../hooks/useStore'

export const Home: React.FC = () => {
  const store = useStore()

  return useObserver(() => (
    <Stack as='main' maxWidth='800px' mx='auto' p='4'>
      <Text fontSize='2em'>Create your timer</Text>
      <Box>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            store.addTimer()
          }}
        >
          <FormControl mb='2'>
            <FormLabel htmlFor='exercise'>Exercise</FormLabel>
            <ExerciseSelect
              id='exercise'
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                store.changeName(e.target.value)
              }}
              value={store.newTimer.name}
            />
          </FormControl>
          <FormControl mb='2'>
            <FormLabel htmlFor='seconds'>
              Exercise time: {store.newTimer.exerciseTime} seconds
            </FormLabel>
            <Input
              id='seconds'
              max='120'
              min='0'
              type='range'
              step='5'
              value={store.newTimer.exerciseTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const parsedSeconds = parseInt(e.target.value)

                store.changeExerciseTime(
                  isNaN(parsedSeconds) ? 0 : parsedSeconds
                )
              }}
            />
          </FormControl>
          <FormControl mb='2'>
            <FormLabel htmlFor='recovery-time'>
              Recovery time: {store.newTimer.recoveryTime} seconds
            </FormLabel>
            <Input
              id='recovery-time'
              type='range'
              max='120'
              min='0'
              step='5'
              value={store.newTimer.recoveryTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const parsedSeconds = parseInt(e.target.value)

                store.changeRecoveryTime(
                  isNaN(parsedSeconds) ? 0 : parsedSeconds
                )
              }}
            />
          </FormControl>
          <Button type='submit' variantColor='teal'>
            Create timer
          </Button>
        </form>
        <Box mt='2'>
          {store.timers.map((timer) => (
            <Timer
              seconds={timer.exerciseTime}
              secondsLeft={timer.secondsLeft}
              key={`${timer.id}-timer`}
              start={timer.start}
              name={timer.name}
            />
          ))}
        </Box>
        <Box mt='2'>
          <Button
            type='button'
            variantColor='teal'
            onClick={() => store.startTimers()}
          >
            Start
          </Button>
        </Box>
      </Box>
    </Stack>
  ))
}
