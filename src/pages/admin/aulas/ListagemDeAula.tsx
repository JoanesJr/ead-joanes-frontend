import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../../shared/components";
import { LayoutBaseDePagina } from "../../../shared/layouts";
import { useDebounce } from '../../../shared/hooks';
import {  ClassService } from "../../../shared/services/api";
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


export const ListagemDeAula  = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [classyes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { state } = useLocation();
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));
    const mdDown = useMediaQuery(theme.breakpoints.down("md"));
    const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
    const xlDown = useMediaQuery(theme.breakpoints.down("xl"));
    const { debounce } = useDebounce();
    
  const [selectionModel, setSelectionModel] = useState<string | number>('');
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const navigate = useNavigate();
  // const { idSection = '1' } = useParams<"idSection">();
  const { idSection } = state;

  
  useEffect(() => {
    // console.log(state);
    const allClasss = async () => {
      ClassService
        .getBySection(idSection)
        .then((data) => {
          for (let item of data) {
            if (item.active) {
              item.active = smDown || mdDown ? "A" : "Ativo";
            } else {
              item.active = smDown || mdDown ? "I" : "Inativo";
            }
          }

          setClasses(data);
        })
        .catch((err) => {
          // console.log(err);
        });
    };

    allClasss();
  }, [classyes]);


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

  const rows = classyes

  const handleDelete = () => {
    if (selectionModel) {
      if (window.confirm("Realmente deseja apagar?")) {
        ClassService.deleteById(selectionModel.toString());
        const newClasss = classyes.filter(
          (classy: any) => classy.id != selectionModel
        );
        setClasses(newClasss);
        // setSearchParams(idSection);
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
       return navigate(
         `/admin/cursos/sessoes/aulas/detalhe/screen`,
         {
           state: {
             class: classyes.filter(
               (item: any) => item.id == selectionModel
             )
           },
         }
       );
     }

     alert("Nenhum item selecionado");
   };

  const handleView = () => {
    if (selectionModel) {
      return navigate(
        `/admin/cursos/sessoes/aulas/detalhe/screen?visualizar=true`,
        {
          state: {
            class: classyes.filter((item: any) => item.id == selectionModel),
          },
        }
      );
    }

    alert("Nenhum item selecionado");
  };


    return (
      <LayoutBaseDePagina
        title="Listagem de Aulas"
        barraDeFerramentas={
          <FerramentasDaListagem
            idRow={selectionModel}
            mostrarBotaoVoltar
            aoClicarEmVoltar={() => navigate(-1)}
            aoClicarEmExcluir={handleDelete}
            aoClicarEmNovo={() =>
              navigate(`/admin/cursos/sessoes/aulas/detalhe/novo`, {
                state: {
                  idSection,
                },
              })
            }
            aoClicarEmEditar={handleEdit}
            aoClicarEmDetalhes={handleView}
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