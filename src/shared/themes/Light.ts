import { createTheme } from '@mui/material'
import { cyan, yellow, red } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: yellow[700],
      dark: yellow[800],
      light: yellow[500],
      contrastText: '#ffffff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#ffffff',
    },
    background: {
      paper: '#303134',
      default: '#202124',
    }
  },
  typography: {
    allVariants: {
      color: yellow[700],
      fontWeight: 'bold'
    }
  }
});