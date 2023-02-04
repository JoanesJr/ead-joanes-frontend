import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../../shared/components";
import { LayoutBaseDePagina } from "../../../shared/layouts";
import { useDebounce } from "../../../shared/hooks";
import { CourseService, UserService } from "../../../shared/services/api";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridSelectionModel,
} from "@mui/x-data-grid";
import {
  Paper,
  useTheme,
  useMediaQuery,
  Alert,
  Collapse,
  IconButton
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

export const Cursos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [unassignCourses, setUnassingCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const xlDown = useMediaQuery(theme.breakpoints.down("xl"));
  const { state } = useLocation();
  const { userId, type } = state;

  const { debounce } = useDebounce();

  const [selectionModel, setSelectionModel] =
    useState<GridSelectionModel>([]);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  useEffect(() => {
    // setIsLoading(true);
    debounce(() => {
      const allCourses = async () => {
        const data: any = await CourseService.getAll(busca);
        data.map((course: any) => {
          setIsLoading(false);
          if (course.active) {
            course.active = smDown || mdDown ? "A" : "Ativo";
          } else {
            course.active = smDown || mdDown ? "I" : "Inativo";
          }
        });

        setIsLoading(false);
        setCourses(data);
      };

      const getUserCourses = async () => {
        const data = await UserService.getById(userId);
        setUserCourses(data.courses);
      }

      const getUnassingCourse = async () => {
        const filter = () => {
            return courses.filter((object1) => {
              return !userCourses.some((object2) => {
                return object1.id === object2.id;
              });
            });
        }

        const unassign = filter();
        setUnassingCourses(unassign);
      }

      const execute = async () => {
            await allCourses();
            await getUserCourses();
            await getUnassingCourse();
      }

      execute();

      
    });
  }, [courses, userCourses, unassignCourses]);

  function convertThemeSpacing(value: number): number {
    if (xlDown) {
      value = (value * 80) / 100;
    }

    if (lgDown) {
      value = (value * 65) / 100;
    }

    if (mdDown) {
      value = (value * 45) / 100;
    }

    if (smDown) {
      value = (value * 75) / 100;
    }
    let width: string | number = theme.spacing(value);
    width = parseInt(width.replace("px", ""));
    return width;
  }

  //  const dataGridService = new DataGridService();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: convertThemeSpacing(15) },
    { field: "title", headerName: "Titulo", width: convertThemeSpacing(80) },
    { field: "active", headerName: "Status", width: convertThemeSpacing(15) },
  ];



  const rows = type == 'add' ? unassignCourses : userCourses ;

  const handleExecute = () => {
    selectionModel.map( id => {
        const obj = {
          id_user: userId,
          id_course: id,
        };

        if (type == "add") {
            UserService.relationCourseAdd(obj)
              .then((data) => {
                setSuccessAlertOpen(true);
                setAlertMessage("Operação realizada com sucesso!");
                setTimeout(() => {
                  setSuccessAlertOpen(false);
                }, 1000);
              })
              .catch((err) => {
                 setSuccessAlertOpen(true);
                 setAlertMessage("Falha ao realizar operação!");
                 setTimeout(() => {
                   setSuccessAlertOpen(false);
                 }, 1000);
              });

            return;
        }

         UserService.relationCourseRemove(obj)
           .then((data) => {
             setSuccessAlertOpen(true);
             setAlertMessage("Operação realizada com sucesso!");
             setTimeout(() => {
               setSuccessAlertOpen(false);
             }, 1000);
           })
           .catch((err) => {
             setSuccessAlertOpen(true);
             setAlertMessage("Falha ao realizar operação!");
             setTimeout(() => {
               setSuccessAlertOpen(false);
             }, 1000);
           });

         return;


    });
  }


  return (
    <LayoutBaseDePagina
      title={type == "add" ? "Vincular Curso" : "Desvincular Curso"}
      barraDeFerramentas={
        <FerramentasDaListagem
          idRow={selectionModel}
          mostrarBotaoVoltar
          aoClicarEmVoltar={() => navigate(-1)}
          mostrarBotaoNovo={false}
          mostrarBotaoEditar={false}
          mostrarBotaoExcluir={false}
          mostrarBotaoDetalhes={false}
          mostrarBotaoVinculo
          aoClicarEmVinculo={handleExecute}
          textoBotaoVinculo={type == "add" ? "Adicionar" : "Remover"}
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
            {alertMessage}
          </Alert>
        </Collapse>
      </Box>
      <Box
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: "auto", height: "90%" }}
      >
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          pageSize={smDown ? 5 : mdDown ? 5 : lgDown ? 5 : xlDown ? 5 : 12}
          loading={isLoading}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          selectionModel={selectionModel}
        />
      </Box>
    </LayoutBaseDePagina>
  );
};
