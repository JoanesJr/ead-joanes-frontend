import { useState, useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Context } from "../../../shared/contexts";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="primary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://planovidaoficial.com.br/" target="_blank">
        Plano Vida
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


export const LoginPage = ({type: string = "comum"}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const auth = useContext(Context);

    const handleSubmit = async event => {
        event.preventDefault();

        if (username.length < 3 || !username.includes("@")) {
          setEmailError(true);

        }

        if (password.length < 5 || password.length > 12) {
          setPasswordError(true);
        }

        if (emailError || passwordError) {
          return;
        }

      const loginRes = await auth.handleLogin({username, password});
      if (loginRes == undefined) {
        setEmailError(true);
        setPasswordError(true);
        return;
      } 

      setEmailError(false);
      setPasswordError(false);

      
    };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          // marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="primary.main">
          Login
        </Typography>
        <Box component="form"  noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            error={emailError}
            autoFocus
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            sx={{ bgcolor: 'secondary.main', color: 'primary.main'}}
            InputLabelProps={{
              style: {color: '#c92f34'},
            }}
            
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            error={passwordError}
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            sx={{ bgcolor: 'secondary.main'}}
            InputLabelProps={{
              style: {color: '#c92f34'},
            }}
          />

          {(emailError || passwordError ) && (
            <Typography variant="caption" color="primary.dark"> - E-mail ou senha incorretos!</Typography>
          )}
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2, bgcolor: 'primary.main' }}
          >
            Entrar
          </Button>
          <Grid container></Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: -8 }} />
    </Container>
  );
}
