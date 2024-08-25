import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Switch } from '@mui/material';

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Set dark mode based on user preference or system preference
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: light)').matches;
    setDarkMode(userPrefersDark);
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#00BFFF',
      },
      secondary: {
        main: '#00FFFF',
      },
    },
  });

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Switch checked={darkMode} onChange={handleToggle} />
      </Box>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;