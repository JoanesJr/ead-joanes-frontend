import {
  Alert,
  Box,
  Button,
  Collapse,
  Grid,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { MyDropzone } from "../../../shared/components";
import { useEffect, useState } from "react";
import { LocalStorage } from "../../../shared/services/localStorage";
import { UserService } from "../../../shared/services/api";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export const PerfilPage = () => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [passwordErrorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const username = LocalStorage.getItem("JSF_U_N_I");

    const obj = {
      email: username,
    };

    UserService.getByEmail(obj).then(({ id }) => {
      setUserId(id);
      UserService.getById(id)
        .then((dt) => {
          setName(dt.name);
          setSurname(dt.surname);
          setEmail(dt.email);
          //   setPassword(dt.password);
        })
        .catch((err) => {
          console.log("deu ruim");
        });
      // console.log(id);
    });
  }, [LocalStorage.getItem("JSF_U_N_I")]);

  const handleSavePersonData = () => {
    const obj = {
      name,
      surname,
      email,
    };

    UserService.updateById(userId, obj)
      .then((dt) => {
        setSuccessAlertOpen(true);
        setTimeout(() => {
          setSuccessAlertOpen(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePassword = () => {
    if (password.length < 3 || password.length > 12) {
      setErrorPassword(true);
      setErrorMessage("A senha deve ter entre 03 e 12 caracteres");
    } else {
      let obj = {
        password: password
      }
      UserService.updateById(userId, obj).then(dt => {
        console.log(dt)
        setErrorPassword(false);
        setErrorMessage("");
        setSuccessAlertOpen(true);
        setTimeout(() => {
          setSuccessAlertOpen(false);
        }, 1000);
      }).catch(err => {
        setErrorPassword(true);
        setErrorMessage("A senha deve ter entre 03 e 12 caracteres");
      })
     
    }
  };

  const handleChangeImage = () => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        UserService.updateImage(userId, formData).then(dt => {
            // console.log(dt);
            setSuccessAlertOpen(true);
            setTimeout( () => {
                setSuccessAlertOpen(false);
                navigate(0);
            }, 1000);
        }).catch(err => {
            console.log("error");
        });
  }

  return (
    <Grid container sx={{display: 'flex', justifyContent: 'center', flexDirection: 'center'}}>
      <Grid item sx={{display: 'flex', justifyContent: 'center', flexDirection: 'center'}}>
        <Box sx={{ width: "100%", margin: 1, display: 'flex', justifyContent: 'center', flexDirection: 'center' }}>
          <Collapse in={successAlertOpen}>
            <Alert
              severity="success"
              variant="standard"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setSuccessAlertOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Operação realizada com sucesso!
            </Alert>
          </Collapse>
        </Box>
      </Grid>
      <Grid
        container
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            m: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Dados pessoais</Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nome"
            name="name"
            autoComplete="name"
            // error={emailError}
            autoFocus
            onChange={(event) => setName(event.target.value)}
            value={name}
            sx={{ bgcolor: "secondary.main", color: "primary.main" }}
            InputLabelProps={{
              style: { color: "#c92f34" },
            }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="surname"
            label="Sobrenome"
            name="surname"
            autoComplete="surname"
            // error={emailError}
            autoFocus
            onChange={(event) => setSurname(event.target.value)}
            value={surname}
            sx={{ bgcolor: "secondary.main", color: "primary.main" }}
            InputLabelProps={{
              style: { color: "#c92f34" },
            }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            // error={emailError}
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            sx={{ bgcolor: "secondary.main", color: "primary.main" }}
            InputLabelProps={{
              style: { color: "#c92f34" },
            }}
          />
        </Grid>
      </Grid>

      <Grid container item>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button variant="contained" sx={{mt: 3}} onClick={handleSavePersonData}>
            Salvar
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        item
        sx={{
          m: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2
          }}
        >
          <Typography variant="h4">Trocar Senha</Typography>
        </Grid>
      </Grid>

      <Grid
        container
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          xl={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Nova Senha"
            name="password"
            autoComplete="email"
            error={errorPassword}
            autoFocus
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            sx={{ bgcolor: "secondary.main", color: "primary.main" }}
            InputLabelProps={{
              style: { color: "#c92f34" },
            }}
          />
          {(errorPassword || passwordErrorMessage) && (
            <Typography variant="caption" color="primary.dark">
              {" "}
              - E-mail ou senha incorretos!
            </Typography>
          )}

          <Button variant="contained" sx={{mt: 3}} onClick={handleChangePassword}>
            Alterar
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        item
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2
          }}
        >
          <Typography variant="h4">Imagem</Typography>
        </Grid>
      </Grid>

      <Grid container item>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            flexDirection: 'column'
          }}
        >
          <Box sx={{width: '34%'}}>
            <MyDropzone
              type="image"
              onFileString={setSelectedFileUrl}
              onFileUploaded={setSelectedFile}
            />
          </Box>

          <Box sx={{mt: 3}}>
            <Button variant="contained" onClick={handleChangeImage}>
              Alterar Imagem
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
