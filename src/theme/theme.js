import { createTheme } from '@mui/material/styles';
import WebFont from 'webfontloader';

const colors = {
  primary: '#1976d2',
  secondary: '#dc004e',
};

WebFont.load({
  google: {
    families: ['Open Sans:300,400,500,700', 'sans-serif'],
  },
});

const typography = {
  fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
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
