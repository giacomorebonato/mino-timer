import { ThemeProvider } from '@chakra-ui/core'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import * as Tone from 'tone'
import { customTheme } from '../../../theme'
import { AddExerciseButton } from '../AddExerciseButton'

jest.mock('tone', () => ({
  start: jest.fn()
}))

describe('<AddExerciseButton />', () => {
  afterEach(() => {
    cleanup()
  })

  it('starts ToneJS only on first click', async () => {
    render(
      <ThemeProvider theme={customTheme}>
        <AddExerciseButton />
      </ThemeProvider>
    )

    await screen.getByText('Add exercise')
    fireEvent.click(screen.getByText('Add exercise'))
    fireEvent.click(screen.getByText('Add exercise'))

    expect(Tone.start).toHaveBeenCalledTimes(1)
  })
})
