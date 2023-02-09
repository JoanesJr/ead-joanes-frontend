import { createTheme } from '@mui/material'
import { cyan, yellow, red } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: "#FFF8DC",
      dark: "#FFF8DC",
      light: "#FFF8DC",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#c92f34",
      dark: "#8B0000",
      light: "B22222",
      contrastText: "#ffffff",
    },
    background: {
      default: "#2F4F4F",
      paper: '#FFF8DC', 
    },
  },
  typography: {
    allVariants: {
      color: yellow[700],
      fontWeight: 'bold'
    }
  }
});