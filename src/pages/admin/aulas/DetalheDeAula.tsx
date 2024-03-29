import { useEffect, useState, useRef } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ArrowCircleDownTwoToneIcon from '@mui/icons-material/ArrowCircleDownTwoTone';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';


import {
  FerramentasDeDetalhe,
  MyDropzone,
  VideoPlayer,
} from "../../../shared/components";
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
  useTheme,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { Environment } from "../../../shared/environment";
import useMediaQuery from "@mui/material/useMediaQuery";

interface IFormDataCreate {
  title: string;
  active: boolean;
  description: string;
  file?: string;
}

interface IFormDataClass {
  title: string;
  active: boolean;
  sectionId?: number;
  type: string;
  description: string;
  file?: string;
}

interface IFormDataUpdate {
  title: string;
  active: boolean;
  type: string;
  description: string;
  file?: string;
}

const formValidationSchemaCreate: yup.SchemaOf<IFormDataUpdate> = yup
  .object()
  .shape({
    title: yup.string().required().min(3),
    description: yup.string().required().min(5).max(194),
    active: yup.boolean().required().default(true),
    type: yup.string().required().default("url"),
    file: yup.string().optional(),
  });

const formValidationSchemaUpdate: yup.SchemaOf<IFormDataUpdate> = yup
  .object()
  .shape({
    title: yup.string().required().min(3),
    description: yup.string().required().min(5).max(160),
    active: yup.boolean().required().default(true),
    type: yup.string().required().default("url"),
    file: yup.string().optional(),
  });

const statusOptions = [
  {
    title: "Ativo",
    value: true,
  },
  {
    title: "Inativo",
    value: false,
  },
];

const typesOptions = [
  {
    title: "Url",
    value: "url",
  },
  {
    title: "Arquivo",
    value: "file",
  },
];

export const DetalheDeAula: React.FC = () => {
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
  const [attachments, setAttachments] = useState<any[]>([]);
  const [downloadLink, setDownloadLink] = useState("");
  const [count, setCount] = useState(0);
  const [selectedAttachmentsString, setSelectedAttachmentsString] =
    useState("");
  const [selectedAttachments, setSelectedAttachments] = useState<File[]>();
  const [viewOnly, setViewOnly] = useState(
    searchParams.get("visualizar") ? true : false
  );
  const [selectedFile, setSelectedFile] = useState<File>();
  // const { idClass = '1' } = useParams<"idClass">();
  let idClass = "0";
  if (state.class) {
    idClass = state.class[0].id;
  }

  const { idSection } = state;

  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  const [type, setType] = useState("url");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (id !== "novo") {
      setIsLoading(true);
      if (state.class) {
        setName(`${state.class[0].title}`);
        if (type == state.class[0].type || !type) {
          setType(state.class[0].type);
          setStatus(state.class[0].active);
          formRef.current?.setData(state.class[0]);
        }
        if (state.class[0].file && type == "file") {
          const pathUrl = `${
            Environment.URL_BASE
          }/getFile${state.class[0].file.replace(".", "")}`;
          setSelectedFileUrl(pathUrl);
        }
        if (state.class[0].file && type == "url") {
          setSelectedFileUrl(state.class[0].file);
        }

        ClassService.getAttachmentClass(state.class[0].id).then(dt => {
            // setAttachments(dt);
            const controlledAttachment = [];
            for (let item of dt) {
              let fileSplit = item.file.split('.');
              let url = `${Environment.URL_BASE}/getFile/${item.file.replace('./', '')}`
              controlledAttachment.push({
                name: item.name,
                url: url,
                extension: fileSplit[fileSplit.length - 1],
                id: item.id
              })
            }

            setAttachments(controlledAttachment);
        }).catch(err => {
          console.log("error");
          // console.log(err)
        })
      }

      setIsLoading(false);
    } else {
      formRef.current?.setData({
        title: "",
        active: true,
        description: "",
        type: "url",
      });
    }
  }, [id, selectedAttachments]);

  const handleSave = (obj: IFormDataClass) => {
    if (id == "novo") {
      obj.sectionId = +idSection;
      formValidationSchemaCreate
        .validate(obj, { abortEarly: false })
        .then((valideObj) => {
          setIsLoading(true);
          if (type === "url") {
            valideObj.file = obj.file;
          }

          ClassService.create(valideObj).then((result) => {
            // console.log(result)
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (selectedFile && type == "file") {
                const formData = new FormData();
                formData.append("file", selectedFile);
                ClassService.updateImage(result.id, formData);
              }
              if (!!selectedAttachments) {
                for (let i = 0; i < selectedAttachments.length; i++) {
                  const formData = new FormData();
                  formData.append("file", selectedAttachments[i]);
                  ClassService.setAttachment(result.id, formData);
                }
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
          // console.log(errors)

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

          if (type == "url") {
            valideObj.file = obj.file;
          }

          ClassService.updateById(idClass, valideObj).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
            } else {
              if (selectedFile && type == "file") {
                const dataImage = new FormData();
                dataImage.append("file", selectedFile);
                ClassService.updateImage(idClass, dataImage);
              }

              if (!!selectedAttachments) {
                for (let i = 0; i < selectedAttachments.length; i++) {
                  const formData = new FormData();
                  formData.append("file", selectedAttachments[i]);
                  ClassService.setAttachment(idClass, formData);
                }
              }

              setSuccessAlertOpen(true);
              setTimeout(() => {
                setSuccessAlertOpen(false);
              }, 1000);
            }
          });
        })
        .catch((errors: yup.ValidationError) => {
          // console.log("errors")
          // console.log(errors)
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
      ClassService.deleteById(idClass);
      setSuccessAlertOpen(true);
      setTimeout(() => {
        setSuccessAlertOpen(false);
      }, 1000);
    }
  };


  const removeAttachment = (id: string | number) => {
    ClassService.removeAttachmentFile(id).then(dt => {
      // console.log(dt);
      navigate(0);
    }).catch(err => {
      // console.log(err);
      console.log('error')
    })
  }

  return (
    <LayoutBaseDePagina
      title={id === "novo" ? "Nova Aula" : name}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoNovo={id !== "novo"}
          mostrarBotaoApagar={id !== "novo"}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          aoClicarEmVoltar={() => navigate(-1)}
          aoClicarEmApagar={handleDelete}
          aoClicarEmNovo={() =>
            navigate(`/admin/cursos/sessoes/aulas/detalhe/novo`, {
              state: {
                idSection,
              },
            })
          }
        />
      }
    >
      {/* <Box sx={{ width: "100%", margin: 1 }}> */}
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
      {/* </Box> */}

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
              <Grid container item xs={12} sm={12} md={12} lg={6} xl={6}>
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
                        name="type"
                        label="Tipo"
                        options={typesOptions}
                        disabled={isLoading || viewOnly}
                        setValueControl={setType}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <VSelect
                        name="active"
                        label="Status"
                        options={statusOptions}
                        disabled={isLoading || viewOnly}
                        setValueControl={setStatus}
                      />
                    </Grid>

                    {!viewOnly && type != "url" && (
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <MyDropzone
                          type="video"
                          onFileString={setSelectedFileUrl}
                          onFileUploaded={setSelectedFile}
                        />
                      </Grid>
                    )}

                    {type != "file" && (
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <VTextField
                          label="Link"
                          name="file"
                          fullWidth
                          disabled={isLoading || viewOnly}
                        />
                      </Grid>
                    )}

                    {!viewOnly && (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        sx={{ mt: 5 }}
                      >
                        <Typography variant="h5" sx={{ mb: 5 }}>
                          Adicionar Anexos
                        </Typography>
                        <MyDropzone
                          type="file"
                          onFileString={setSelectedAttachmentsString}
                          onFileUploadAttchment={setSelectedAttachments}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
              {selectedFileUrl && type != "url" && (
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

              {attachments && (
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  marginTop={!lgDown && viewOnly ? -22 : 5}
                >
                  <Grid
                    item
                    xs={12}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box>
                      {attachments.map( att => (
                        <Box sx={{display: 'flex'}}>
                          <AttachFileRoundedIcon sx={{color: 'secondary.main'}} />
                          <Box sx={{display: 'flex', width: '100%'}}>
                            <Typography variant="body2">{att.name}</Typography>
                          </Box>
                          <Box>
                            <ArrowCircleDownOutlinedIcon sx={{color: 'secondary.main', ml: 2}} onClick={() =>  {
                              setDownloadLink(`${att.url}?c=${count}`);
                              setCount(count + 1)} }
                              />
                          </Box>
                          {!viewOnly && (
                            <Box>
                            <HighlightOffRoundedIcon sx={{color: 'secondary.main', ml: 2}} onClick={() =>  {removeAttachment(att.id)}}
                              />
                          </Box>
                          )}
                          
                          
                        </Box>
                      ) )}
                    </Box>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Box>
      </Form>

      <iframe src={downloadLink} style={{display:'none'}}></iframe>

      {isLoading && <LinearProgress variant="indeterminate" />}
    </LayoutBaseDePagina>
  );
};
