import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Text
} from '@chakra-ui/core'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { ExerciseSelect, Timer, TimeSelect } from '../components'
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
            <FormLabel htmlFor='exercise-time'>
              Exercise time: {store.newTimer.exerciseTime} seconds
            </FormLabel>
            <TimeSelect
              id='exercise-time'
              value={store.newTimer.exerciseTime}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
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
            <TimeSelect
              id='recovery-time'
              value={store.newTimer.recoveryTime}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
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
              recoveryTime={timer.recoveryTime}
              exerciseTime={timer.exerciseTime}
              recoverySecondsLeft={timer.recoverySecondsLeft}
              secondsLeft={timer.secondsLeft}
              key={`${timer.id}-timer`}
              start={timer.start}
              name={timer.name}
            />
          ))}
        </Box>
        {store.timers.length > 0 && (
          <Box mt='2'>
            <Flex>
              <Button
                flex='1'
                type='button'
                variantColor='teal'
                onClick={() => store.startTimer()}
              >
                Start
              </Button>
              <Button
                flex='1'
                type='button'
                ml='1'
                mr='1'
                onClick={() => {
                  store.stopTimers()
                }}
              >
                Stop
              </Button>
              <Button
                flex='1'
                type='button'
                onClick={() => store.clearTimers()}
              >
                Clear
              </Button>
            </Flex>
          </Box>
        )}
      </Box>
    </Stack>
  ))
}
