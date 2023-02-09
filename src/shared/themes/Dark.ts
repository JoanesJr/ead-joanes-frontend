import { createTheme } from '@mui/material'
import { cyan, yellow } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#c92f34",
      dark: "#8B0000",
      light: "B22222",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#78b6e6",
      dark: "#000080",
      light: "#87CEEB",
      contrastText: "#ffffff",
    },
    background: {
        default: "#DCDCDC",
        paper: '#c92f34', 
    },
  },
  typography: {
    allVariants: {
      color: "#78b6e6",
      fontWeight: 'bold'
    }
  }
});