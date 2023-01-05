import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useDebounce } from '../../shared/hooks';
import { UserService } from "../../shared/services/api";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  LinearProgress,
} from "@mui/material";
import { IUser } from "../../shared/services/api/interfaces";
import { Environment } from "../../shared/environment";


export const ListagemDeUsuario  = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
            setIsLoading(false);
            setUsers(data);
        };

        
        allUsers();
        console.log('oi')
        
    });
    
  }, [busca]);


    return (
      <LayoutBaseDePagina
        title="Listagem de Usuários"
        barraDeFerramentas={
          <FerramentasDaListagem
            mostrarInputBusca
            textoDaBusca={busca}
            aoMudarTextoDeBusca={(texto) =>
              setSearchParams({ busca: texto }, { replace: true })
            }
          />
        }
      >
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ m: 1, width: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome Completo</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Ativo</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row: IUser) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {row.name} {row.surname}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.active ? "Ativo" : "Inativo"}</TableCell>
                  <TableCell>{row.admin ? "Admin" : "Comum"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
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