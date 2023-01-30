import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../../shared/components";
import { LayoutBaseDePagina } from "../../../shared/layouts";
import { useDebounce } from '../../../shared/hooks';
import {  SectionService } from "../../../shared/services/api";
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
import CloseIcon from '@mui/icons-material/Close';
import { IClass } from "../../../shared/services/api/interfaces";


export const ListagemDeSessao  = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sections, setSections] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));
    const mdDown = useMediaQuery(theme.breakpoints.down("md"));
    const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
    const xlDown = useMediaQuery(theme.breakpoints.down("xl"));
    const { debounce } = useDebounce();
    
  const [selectionModel, setSelectionModel] = useState<string | number>('');
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { idCourse } = state;
  console.log(idCourse)


    const objData = {
        username: 'joanesdejesusjr@gmail.com',
        password: 'def75315901',
    }
  const sectionService = new SectionService(objData);
  
  useEffect(() => {
    // setIsLoading(true);
    debounce(() => {
        const allSections = async () => {
        const data: any = await sectionService.getByCourse(idCourse);
          data.map((section: any) => {
            // setIsLoading(false);
            if(section.active) {
              section.active = (smDown || mdDown) ? 'A' : 'Ativo'
            } else {
              section.active = smDown || mdDown ? "I" : "Inativo";
            }
          });

          // setIsLoading(false);
          setSections(data);
        };

        
        allSections();
        
    });
  }, [sections]);


  function convertThemeSpacing(value: number): number {
    if (xlDown) {
      value = value*80/100;
    }

    if (lgDown) {
      value = value*65/100;
    }

    if (mdDown) {
      value = value*45/100;
    }

    if (smDown) {
      value = value*75/100;
    }
    let width: string | number = theme.spacing(value)
    width = parseInt(width.replace("px", ""));
    return width;
  }

//  const dataGridService = new DataGridService();


  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: convertThemeSpacing(15) },
    { field: "title", headerName: "Titulo", width: convertThemeSpacing(80) },
    { field: "active", headerName: "Status", width: convertThemeSpacing(15) },
  ]; 

  const rows = sections

  const handleDelete = () => {
    if (selectionModel) {
      if (window.confirm("Realmente deseja apagar?")) {
        sectionService.deleteById(selectionModel.toString());
        const newSections = sections.filter(
          (section: any) => section.id != selectionModel
        );
        setSections(newSections);
        setSearchParams(idCourse);
        setSuccessAlertOpen(true);
        setTimeout(() => {
          setSuccessAlertOpen(false);
        }, 1000);
      }

      return;
    }
    
    alert("Nenhum item selecionado");
    
  }

   const handleEdit = () => {
     if (selectionModel) {
       return navigate(`/admin/cursos/sessoes/detalhe/${selectionModel}`, {
        state: {
          idCourse
        }
       });
     }

     alert("Nenhum item selecionado");
   };

  const handleView = () => {
    if (selectionModel) {
      return  navigate(
                `/admin/cursos/sessoes/detalhe/${selectionModel}?visualizar=true`, {
                  state: {
                    idCourse
                  }
                }
              )
    }

    alert("Nenhum item selecionado");
  };

  const handleClass = () => {
    if (selectionModel) {
      const sectionClass: IClass[] = sections.filter((item: any) => item.id == selectionModel);
      return navigate(`/admin/cursos/sessoes/aulas`, {
        state: {
          idSection: selectionModel,
        },
      });
    }

    alert("Nenhuma sessão selecionado");
  };


    return (
      <LayoutBaseDePagina
        title="Listagem de Sessões"
        barraDeFerramentas={
          <FerramentasDaListagem
            idRow={selectionModel}
            mostrarBotaoVoltar
            mostrarBotaoAula
            aoClicarEmVoltar={() => navigate(-1)}
            aoClicarEmExcluir={handleDelete}
            aoClicarEmNovo={() =>
              navigate(`/admin/cursos/sessoes/detalhe/novo`, {
                state: {
                  idCourse
                }
              })
            }
            aoClicarEmEditar={handleEdit}
            aoClicarEmDetalhes={handleView}
            aoClicarEmAula={handleClass}
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
        <Box
          component={Paper}
          variant="outlined"
          sx={{ m: 1, width: "auto", height: "90%" }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={smDown ? 5 : mdDown ? 5 : lgDown ? 5 : xlDown ? 5 : 12}
            loading={isLoading}
            onRowClick={(params) => {
              setSelectionModel(params.id);
            }}
          />
        </Box>
      </LayoutBaseDePagina>
    );
}