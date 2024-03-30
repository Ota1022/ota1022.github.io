'use client'

import { createContext, useMemo, useState } from 'react'
import { createTheme } from '@mui/material/styles'

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
})

export function useThemeContent() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark')

  const colorMode = {
    toggleColorMode: () => {
      console.log(mode)
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    },
  }
  const theme = useMemo(
    () => createTheme({ palette: { mode }}),
    [mode]
  )

  return { colorMode, theme }
}