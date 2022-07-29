import { createTheme, Theme } from '@mui/material';

export const defaultTheme: Theme = createTheme({
  palette: {
    primary: {
      main: '#6563ff',
    },
    secondary: {
      main: '#D8D8FF',
    },
  },
  typography: {
    h1: {
      fontSize: 34,
      fontWeight: 700,
      lineHeight: 1.32,
    },
    h2: {
      fontSize: 27,
      fontWeight: 700,
    },
    h3: {
      fontSize: 25,
      fontWeight: 600,
    },
  },
});
