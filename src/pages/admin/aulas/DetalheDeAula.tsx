import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

import { FerramentasDeDetalhe, MyDropzone, VideoPlayer } from "../../../shared/components";
import { LayoutBaseDePagina } from "../../../shared/layouts";
import { ClassService } from "../../../shared/services/api";
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
  useTheme
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { Environment } from "../../../shared/environment";
import useMediaQuery from "@mui/material/useMediaQuery";
import ImageList from "@mui/material/ImageList";

interface IFormDataCreate {
  title: string;
  active: boolean;
  description: string;
}

interface IFormDataClass {
  title: string;
  active: boolean;
  sectionId?: number;
  description: string;
}

interface IFormDataUpdate {
  title: string;
  active: boolean;
  description: string;
}

const formValidationSchemaCreate: yup.SchemaOf<IFormDataCreate> = yup
  .object()
  .shape({
    title: yup.string().required().min(3),
    description: yup.string().required().min(5),
    active: yup.boolean().required().default(true),
  });

const formValidationSchemaUpdate: yup.SchemaOf<IFormDataUpdate> = yup
  .object()
  .shape({
    title: yup.string().required().min(3),
    description: yup.string().required().min(5),
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

export const DetalheDeAula: React.FC = () => {
  const objData = {
    username: "joanesdejesusjr@gmail.com",
    password: "def75315901",
  };
  const { id = "novo" } = useParams<"id">();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useLocation();
  

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [image, setImage] = useState("");
  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  const [viewOnly, setViewOnly] = useState(
    searchParams.get("visualizar") ? true : false
  );
  const [selectedFile, setSelectedFile] = useState<File>();
  const { idClass = '1' } = useParams<"idClass">();
   
   const theme = useTheme();
   const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

   const classService = new ClassService(objData);

  useEffect(() => {
    if (id !== "novo") {
          setIsLoading(true);
          setName(`${state.class[0].title}`);
          formRef.current?.setData(state.class[0]);
          setIsLoading(false);
          if (state.class[0].file) {
            const pathUrl = `${Environment.URL_BASE}/getFile${state.class[0].file.replace(".", "")}`;
            setSelectedFileUrl(pathUrl);
          }
    } else {
        formRef.current?.setData({
          title: "",
          active: true,
          description: ""
        });
    }
  }, [id]);

  const handleSave = (obj: IFormDataClass) => {
    if (id == "novo") {
      obj.sectionId = +state.sectionId;
      formValidationSchemaCreate
        .validate(obj, { abortEarly: false })
        .then((valideObj) => {
          setIsLoading(true);
          
          classService.create(valideObj).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (selectedFile) {
                const formData = new FormData();
                formData.append("file", selectedFile);
                classService.updateImage(result.id, formData);
              }
              setSuccessAlertOpen(true);
              setTimeout(() => {
                setSuccessAlertOpen(false);

                navigate(-1);
              }, 1000);
            }
          });
        })
        .catch((errors: yup.ValidationError) => {
          const validationErrors: IVFormErrors = {};
          console.log(errors)

          errors.inner.forEach((error) => {
            if (!error.path) return;

            validationErrors[error.path] = error.message;
          });

          formRef.current?.setErrors(validationErrors);
        });
    } else {
      formValidationSchemaUpdate
        .validate(obj, { abortEarly: false })
        .then((valideObj) => {
          setIsLoading(true);

          classService.updateById(idClass, valideObj).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (selectedFile) {
                const dataImage = new FormData();
                dataImage.append("file", selectedFile);
                classService.updateImage(idClass, dataImage);
              }
              setSuccessAlertOpen(true);
              setTimeout(() => {
                setSuccessAlertOpen(false);
              }, 1000);
            }
          });
        })
        .catch((errors: yup.ValidationError) => {
          console.log("errors")
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
      classService.deleteById(idClass);
      setSuccessAlertOpen(true);
      setTimeout(() => {
        setSuccessAlertOpen(false);
      }, 1000);
    }
  };

  return (
    <LayoutBaseDePagina
      title={id === "novo" ? "Nova Aula" : name}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== "novo"}
          mostrarBotaoApagar={id !== "novo"}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          aoClicarEmVoltar={() => navigate(-1)}
          aoClicarEmApagar={handleDelete}
          aoClicarEmNovo={() =>
            navigate(`/admin/cursos/sessaos/aulas/detalhe/${idClass}/novo`)
          }
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
                marginTop={!lgDown && viewOnly ? -22 : 0}
              >
                <Grid container item direction="row" spacing={2}>
                  <Grid container item direction="row" spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <VTextField
                        label="Descrição"
                        name="description"
                        fullWidth
                        disabled={isLoading || viewOnly}
                      />
                    </Grid>
                  </Grid>
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
                          type="video"
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
                    <Box>
                      <VideoPlayer
                        width="100%"
                        height="100%"
                        srcVideo={selectedFileUrl}
                      />
                    </Box>
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
