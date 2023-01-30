import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { FerramentasDeDetalhe, MyDropzone, VideoPlayer } from "../../../shared/components";
import { LayoutBaseDePagina } from "../../../shared/layouts";
import { CourseService } from "../../../shared/services/api";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { IVFormErrors, VSelect, VTextField } from "../../../shared/forms";
import { Box } from "@mui/system";
import {
  Paper,
  Grid,
  LinearProgress,
  Typography,
  Alert,
  Collapse,
  IconButton,
  ImageListItem,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { Environment } from "../../../shared/environment";
import useMediaQuery from "@mui/material/useMediaQuery";
import ImageList from "@mui/material/ImageList";

interface IFormDataCreate {
  title: string;
  active: boolean;
}

interface IFormDataUpdate {
  title: string;
  active: boolean;
}

const formValidationSchemaCreate: yup.SchemaOf<IFormDataCreate> = yup
  .object()
  .shape({
    title: yup.string().required().min(3),
    active: yup.boolean().required().default(true),
  });

const formValidationSchemaUpdate: yup.SchemaOf<IFormDataUpdate> = yup
  .object()
  .shape({
    title: yup.string().required().min(3),
    active: yup.boolean().required().default(true),
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

export const DetalheDeCurso: React.FC = () => {
  const objData = {
    username: "joanesdejesusjr@gmail.com",
    password: "def75315901",
  };
  const { id = "novo" } = useParams<"id">();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [image, setImage] = useState("");
  const [viewOnly, setViewOnly] = useState(
    searchParams.get("visualizar") ? true : false
  );
   
   const theme = useTheme();
   const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
   const [selectedFileUrl, setSelectedFileUrl] = useState("");
   const [selectedFile, setSelectedFile] = useState<File>();

   const courseService = new CourseService(objData);

  useEffect(() => {
    if (id !== "novo") {
      setIsLoading(true);

      courseService.getById(id).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate(-1);
        } else {
          setName(`${result.title}`);
          if (result.file) {
            const pathUrl = `${Environment.URL_BASE}/getFile${result.file.replace(".", "")}`
            setImage(pathUrl);
            setSelectedFileUrl(pathUrl)
          }else {
            setImage(
              "https://images.tcdn.com.br/img/img_prod/852394/curso_online_meu_primeiro_huawei_iniciacao_para_roteador_de_borda_huawei_297_1_8178f580feb2beae96a9365e3ab6ff85.png"
            );
          }
          
          formRef.current?.setData(result);
          
        }
      });
    } else {
        formRef.current?.setData({
          title: "",
          active: true
        });
    }
  }, [id]);

  const handleSave = (obj: IFormDataCreate | IFormDataUpdate) => {
    if(id == 'novo') {
      formValidationSchemaCreate
      .validate(obj, { abortEarly: false })
      .then((valideObj) => {
        setIsLoading(true);
          courseService.create(valideObj).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (selectedFile) {
                const formData = new FormData();
                formData.append("file", selectedFile);
                courseService.updateImage(result.id, formData);
              }
               setSuccessAlertOpen(true);
               setTimeout(() => {
                 setSuccessAlertOpen(false);
                 navigate(Environment.ADMIN_CURSOS);
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

          courseService.updateById(id, valideObj).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (selectedFile) {
                const formData = new FormData();
                formData.append("file", selectedFile);
                courseService.updateImage(result.id, formData);
              }
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
      courseService.deleteById(id);
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
          mostrarBotaoNovo={id !== "novo"}
          mostrarBotaoApagar={id !== "novo"}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          aoClicarEmVoltar={() => navigate(-1)}
          aoClicarEmApagar={handleDelete}
          aoClicarEmNovo={() => navigate("/admin/cursos/detalhe/novo")}
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
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid
              container
              item
              direction="row"
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              spacing={2}
            >
              <Grid container item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <VTextField
                    label="Título"
                    name="title"
                    fullWidth
                    disabled={isLoading || viewOnly}
                  />
                </Grid>
              </Grid>

            </Grid>

            <Grid container item>
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                // marginTop={!lgDown && viewOnly ? -22 : 0}
              >
                <Grid container item direction="row" spacing={2}>
                  <Grid container item direction="row" spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <VSelect
                        name="active"
                        label="Status"
                        options={statusOptions}
                        disabled={isLoading || viewOnly}
                      />
                    </Grid>

                    {!viewOnly && (
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <MyDropzone
                          type="image"
                          onFileString={setSelectedFileUrl}
                          onFileUploaded={setSelectedFile}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              {selectedFileUrl && (
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  marginTop={!lgDown && viewOnly ? -22 : -5}
                >
                  <Grid
                    item
                    xs={12}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 300,
                        width: 350,
                        maxHeight: { xs: 233, md: 167, lg: 300, xl: 300 },
                        maxWidth: { xs: 350, md: 250, lg: 350, xl: 350 },
                        marginTop: {xs: 8, md: 8}
                      }}
                      alt="The house from the offer."
                      src={selectedFileUrl}
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Box>
      </Form>

      {isLoading && <LinearProgress variant="indeterminate" />}
    </LayoutBaseDePagina>
  );
};
