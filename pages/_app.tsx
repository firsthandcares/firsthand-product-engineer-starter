import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import ThemeProvider from '@mui/styles/ThemeProvider';
import React from 'react';
import { lightTheme } from '../constants/theme';

const App = ({ Component, pageProps: { ...pageProps } }: any) => (
  <StyledEngineProvider injectFirst>
    <EmotionThemeProvider theme={lightTheme}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </EmotionThemeProvider>
  </StyledEngineProvider>
);

export default App;
