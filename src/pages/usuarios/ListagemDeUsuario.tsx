import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useDebounce } from '../../shared/hooks';
import { DataGridService, UserService } from "../../shared/services/api";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
  LinearProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { IUser } from "../../shared/services/api/interfaces";
import { Environment } from "../../shared/environment";
import { Box } from "@mui/system";
import { FerramentasDeDetalhe } from "../../shared/components/ferramentas-de-detalhe/FerramentasDeDetalhe";


export const ListagemDeUsuario  = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));
    const mdDown = useMediaQuery(theme.breakpoints.down("md"));
    const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
    const xlDown = useMediaQuery(theme.breakpoints.down("xl"));
    const { debounce } = useDebounce();
    
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);


    const objData = {
        username: 'joanesdejesusjr@gmail.com',
        password: 'def75315901',
    }
  const service = new UserService(objData);
  
  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
        const allUsers = async () => {
        const data: any = await service.getAll(busca);
          data.map((user: any) => {
            if (user.admin) {
              user.admin = (smDown || mdDown) ? 'S' : 'Admin';
            } else {
              user.admin = (smDown || mdDown) ? 'N' : 'Básico';
            }

            if(user.active) {
              user.active = (smDown || mdDown) ? 'A' : 'Ativo'
            } else {
              user.active = smDown || mdDown ? "I" : "Inativo";
            }
          });
            setIsLoading(false);
            setUsers(data);
        };

        
        allUsers();
        
    });
    
  }, [users]);


  function convertThemeSpacing(value: number): number {
    if (xlDown) {
      value = value*80/100;
      console.log('xl')
    }

    if (lgDown) {
      value = value*55/100;
       console.log("lg");
    }

    if (mdDown) {
      value = value*35/100;
       console.log("md");
    }

    if (smDown) {
      value = value*1/100;
       console.log("sm");
    }
    let width: string | number = theme.spacing(value)
    width = parseInt(width.replace("px", ""));
    return width;
  }

//  const dataGridService = new DataGridService();


  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: convertThemeSpacing(5) },
    {
      field: "fullName",
      headerName: "Nome Completo",
      sortable: true,
      width: convertThemeSpacing(60),
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.name || ""} ${params.row.surname || ""}`,
    },
    { field: "email", headerName: "Email", width: convertThemeSpacing(60) },
    { field: "active", headerName: "Status", width: convertThemeSpacing(15) },
    { field: "admin", headerName: "Admin", width: convertThemeSpacing(15) },
  ]; 

  const rows = users


    return (
      <LayoutBaseDePagina
        title="Listagem de Usuários"
        barraDeFerramentas={
          <FerramentasDeDetalhe
          />
        }
      >
        <Box component={Paper} variant="outlined" sx={{ m: 1, width: "auto", height: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </Box>
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ m: 1, width: "auto" }}
        >
          <Table>
            {users.length == 0 && !isLoading && (
              <caption>{Environment.LISTAGEM_VAZIA}</caption>
            )}
            <TableFooter>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <LinearProgress variant="indeterminate" />
                  </TableCell>
                </TableRow>
              )}
            </TableFooter>
          </Table>
        </TableContainer>
      </LayoutBaseDePagina>
    );
}