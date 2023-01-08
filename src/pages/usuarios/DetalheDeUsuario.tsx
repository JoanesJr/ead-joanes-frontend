import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { UserService } from "../../shared/services/api";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { IVFormErrors, VSelect, VTextField } from "../../shared/forms";
import { Box } from "@mui/system";
import { Paper, Grid, LinearProgress, Typography } from "@mui/material";
import * as yup from "yup";

interface IFormData {
  name: string;
  surname: string;
  email: string;
  password?: string;
  active?: boolean;
  admin?: boolean;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  name: yup.string().required().min(3),
  surname: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(3).max(12),
  active: yup.boolean().required().default(true),
  admin: yup.boolean().required().default(false)
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

  const handleSave = (obj: IFormData) => {
    formValidationSchema
      .validate(obj, { abortEarly: false })
      .then((valideObj) => {
        setIsLoading(true);

        if (id === "novo") {
          userService.create(valideObj).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              navigate("/usuarios");
            }
          });
        } else {
          userService.updateById(id, valideObj).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              console.log("atualizado");
              console.log(result);
            }
          });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {}

        errors.inner.forEach(error => {
          if (!error.path) return;
          
          validationErrors[error.path] = error.message;
        })

        formRef.current?.setErrors(validationErrors);
      });


   
  };

  const handleDelete = async () => {
    if (window.confirm("Realmente deseja apagar?")) {
      await userService.deleteById(id);
      navigate('/usuarios');
    }
  }

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
