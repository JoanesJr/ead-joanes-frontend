import { createTheme } from '@mui/material'

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#c92f34",
      dark: "#8B0000",
      light: "#56b2cb",
      contrastText: "#56b2cb",
    },
    secondary: {
      main: "#FA7B95",
      dark: "#00B89F",
      light: "#FFFFFF",
      contrastText: "#56b2cb",
    },
    background: {
        default: "#FA7B95",
        paper: '#F5F5F5', 
    },
  },
  typography: {
    allVariants: {
      // color: "#78b6e6",
      color: "#56b2cb",
      fontWeight: 'bold'
    }
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: '#56b2cb',
        },
      },
    },
    MuiLinearProgress: {
      defaultProps: {
        color: 'inherit'
      }
    },
    MuiSelect: {
      defaultProps: {
        color: 'info',
      }
    },
  },
  
});


// rosa: FA7B95
// verde: 00B89F
// azul : 56b2cb