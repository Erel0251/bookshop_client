import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#ffffff', // Main background color
      paper: '#f5f5f5',  // Slightly darker for paper components
    },
    text: {
      primary: '#000000', // Main text color
      secondary: '#4f4f4f', // Secondary text color
    },
    divider: '#e0e0e0', // Color for dividers
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#dedede',
          color: '#000000',
        },
      },
    },
  },
});

export default theme;
