'use client';

import { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeOptions, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

// system
import { shadows } from './shadows';
import { typography } from './typography';

// options
import { customShadows } from './custom-shadows';
import { componentsOverrides } from './overrides';
import { createPresets } from './options/presets';
import NextAppDirEmotionCacheProvider from './next-emotion-cache';
import { palette } from './palette';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const presets = createPresets();
  const memoizedValue = useMemo(
    () => ({
      palette: {
        ...palette(),
        ...presets.palette,
      },
      customShadows: {
        ...customShadows(),
        ...presets.customShadows,
      },
      shadows: shadows(),
      shape: { borderRadius: 8 },
      typography,
    }),
    [presets.palette, presets.customShadows]
  );

  const theme = createTheme(memoizedValue as ThemeOptions);

  theme.components = componentsOverrides(theme);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
