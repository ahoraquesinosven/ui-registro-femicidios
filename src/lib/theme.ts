import { createTheme } from '@mui/material/styles';
import '@fontsource/ubuntu/500.css';

// Palette from ahoraquesinosven.com.ar: violet as primary, magenta as an accent.
// Magenta isn't primary because it reads too close to the error red next to it.
export const theme = createTheme({
  palette: {
    primary: { main: '#90278e' },
    secondary: { main: '#ec268f' },
  },
  typography: {
    h6: { fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif' },
  },
});
