import { createTheme } from '@mui/material/styles';

const colors = {
  primary: '#1976d2',
  secondary: '#dc004e',
};

const typography = {
  fontFamily: 'Open Sans, sans-serif',
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
  typography: {
    ...typography,
  },
});

export default theme;
