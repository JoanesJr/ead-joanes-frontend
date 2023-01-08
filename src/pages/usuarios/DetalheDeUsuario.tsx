import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { UserService } from "../../shared/services/api";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { IVFormErrors, VSelect, VTextField } from "../../shared/forms";
import { Box } from "@mui/system";
import {
  Paper,
  Grid,
  LinearProgress,
  Typography,
  Alert,
  Collapse,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";

interface IFormDataCreate {
  name: string;
  surname: string;
  email: string;
  password: string;
  active: boolean;
  admin: boolean;
}

interface IFormDataUpdate {
  name: string;
  surname: string;
  email: string;
  active: boolean;
  admin: boolean;
}

const formValidationSchemaCreate: yup.SchemaOf<IFormDataCreate> = yup
  .object()
  .shape({
    name: yup.string().required().min(3),
    surname: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(3).max(12),
    active: yup.boolean().required().default(true),
    admin: yup.boolean().required().default(false),
  });

const formValidationSchemaUpdate: yup.SchemaOf<IFormDataUpdate> = yup
  .object()
  .shape({
    name: yup.string().required().min(3),
    surname: yup.string().required().min(3),
    email: yup.string().required().email(),
    active: yup.boolean().required().default(true),
    admin: yup.boolean().required().default(false),
  });

const statusOptions = [
  {
    title: 'Ativo',
    value: true
  },
  {
    title: 'Inativo',
    value: false
  }
];

const adminOptions = [
    {
    title: 'Básico',
    value: false
  },
  {
    title: 'Admin',
    value: true
  }
]


export const DetalheDePessoasUsuario: React.FC = () => {
  const { id = "novo" } = useParams<"id">();
  const navigate = useNavigate();
   const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
   const [successAlertOpen, setSuccessAlertOpen] = useState(false);
   const objData = {
     username: "joanesdejesusjr@gmail.com",
     password: "def75315901",
   };
   const userService = new UserService(objData);

  useEffect(() => {
    if (id !== "novo") {
      setIsLoading(true);

      userService.getById(id).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate("/usuarios");
        } else {
          setName(`${result.name} ${result.surname}`);
          formRef.current?.setData(result);
        }
      });
    } else {
        formRef.current?.setData({
          name: "",
          surname: "",
          email: "",
          password: "",
          active: true,
          admin: false
        });
    }
  }, [id]);

  const handleSave = (obj: IFormDataCreate | IFormDataUpdate) => {
    if(id == 'novo') {
      formValidationSchemaCreate
      .validate(obj, { abortEarly: false })
      .then((valideObj) => {
        setIsLoading(true);
          userService.create(valideObj).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
               setSuccessAlertOpen(true);
               setTimeout(() => {
                 setSuccessAlertOpen(false);
                 navigate("/usuarios");
               }, 1000);
            }
          })
      }).catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {}

        errors.inner.forEach(error => {
          if (!error.path) return;
          
          validationErrors[error.path] = error.message;
        })

        formRef.current?.setErrors(validationErrors);
      });
    } else {
      formValidationSchemaUpdate
        .validate(obj, { abortEarly: false })
        .then((valideObj) => {
          setIsLoading(true);

          userService.updateById(id, valideObj).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
               setSuccessAlertOpen(true);
               setTimeout(() => {
                 setSuccessAlertOpen(false);
               }, 1000);
            }
          });
        })
        .catch((errors: yup.ValidationError) => {
          const validationErrors: IVFormErrors = {};

          errors.inner.forEach((error) => {
            if (!error.path) return;

            validationErrors[error.path] = error.message;
          });

          formRef.current?.setErrors(validationErrors);
        });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Realmente deseja apagar?")) {
      userService.deleteById(id);
      setSuccessAlertOpen(true);
      setTimeout(() => {
        setSuccessAlertOpen(false);
      }, 1000);
    }
  };

  return (
    <LayoutBaseDePagina
      title={id === "novo" ? "Novo usuário" : name}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "novo"}
          mostrarBotaoApagar={id !== "novo"}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          aoClicarEmVoltar={() => navigate("/usuarios")}
          aoClicarEmApagar={handleDelete}
          aoClicarEmNovo={() => navigate("/usuarios/detalhe/novo")}
        />
      }
    >
      <Box sx={{ width: "100%", margin: 1 }}>
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

      <Form ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          component={Paper}
          variant="outlined"
          flexDirection="column"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <VTextField
                  label="Nome"
                  name="name"
                  fullWidth
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <VTextField
                  fullWidth
                  name="surname"
                  label="Sobrenome"
                  disabled={isLoading}
                />
              </Grid>

              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <VTextField
                    fullWidth
                    label="Email"
                    name="email"
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>

              {id == "novo" && (
                <Grid container item direction="row" spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <VTextField
                      fullWidth
                      label="Senha"
                      name="password"
                      disabled={isLoading}
                    />
                  </Grid>
                </Grid>
              )}
              <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <VSelect
                    name="active"
                    label="Status"
                    options={statusOptions}
                    disabled={isLoading}
                  />
                  <VSelect
                    name="admin"
                    label="Admin"
                    options={adminOptions}
                    disabled={isLoading}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Form>

      {isLoading && <LinearProgress variant="indeterminate" />}
    </LayoutBaseDePagina>
  );
};
