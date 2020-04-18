import { ThemeProvider } from '@chakra-ui/core'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import * as Tone from 'tone'
import { customTheme } from '../../../theme'
import { StartExerciseButton } from '../StartExerciseButton'

jest.mock('tone', () => ({
  start: jest.fn()
}))

describe('<StartExerciseButton />', () => {
  afterEach(() => {
    cleanup()
  })

  it('starts ToneJS only on first click', async () => {
    render(
      <ThemeProvider theme={customTheme}>
        <StartExerciseButton onClick={() => {}} isDisabled={false} />
      </ThemeProvider>
    )

    await screen.getByText('Start')
    fireEvent.click(screen.getByText('Start'))
    fireEvent.click(screen.getByText('Start'))

    expect(Tone.start).toHaveBeenCalledTimes(1)
  })
})
