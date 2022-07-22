import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

export const themeOptions: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#6563ff',
    },
    secondary: {
      main: 'rgba(11, 36, 251, 1)',
    },
  },
  typography: {
    h1: {
      fontSize: 34,
      fontWeight: 700,
      lineHeight: 1.32,
    },
    h2: {
      fontFamily: 'Roboto',
      fontSize: 27,
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Roboto',
      fontSize: 25,
      fontWeight: 600,
    },
  },
};