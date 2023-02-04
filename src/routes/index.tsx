import { Routes, Route, Navigate } from 'react-router-dom';
import { 
  Dashboard,
  DetalheDeCurso,
  DetalheDePessoasUsuario,
  DetalheDeAula,
  ListagemDeCurso,
  ListagemDeUsuario,
  ListagemDeAula,
  Cursos,
 } from '../pages';
import { DetalheDeSessao } from '../pages/admin/sessoes/DetalheDeSessao';
import { ListagemDeSessao } from '../pages/admin/sessoes/ListagemDeSessao';
import { MenuLateral } from '../shared/components';
import { Environment } from '../shared/environment';


export const AppRoutes = () => {

  return (
    <Routes>
      <Route
        path={Environment.ADMIN_USUARIOS}
        element={
          <MenuLateral>
            <ListagemDeUsuario />
          </MenuLateral>
        }
      />
      <Route
        path={Environment.ADMIN_USUARIOS_CURSOS}
        element={
          <MenuLateral>
            <Cursos />
          </MenuLateral>
        }
      />
      <Route
        path={Environment.ADMIN_USUARIOS_DETALHE}
        element={
          <MenuLateral>
            <DetalheDePessoasUsuario />
          </MenuLateral>
        }
      />

      <Route
        path={Environment.ADMIN_CURSOS}
        element={
          <MenuLateral>
            <ListagemDeCurso />
          </MenuLateral>
        }
      />
      <Route
        path={Environment.ADMIN_CURSOS_DETALHE}
        element={
          <MenuLateral>
            <DetalheDeCurso />
          </MenuLateral>
        }
      />

      <Route
        path={Environment.ADMIN_SESSOES}
        element={
          <MenuLateral>
            <ListagemDeSessao />
          </MenuLateral>
        }
      />
      <Route
        path={Environment.ADMIN_SESSOES_DETALHE}
        element={
          <MenuLateral>
            <DetalheDeSessao />
          </MenuLateral>
        }
      />

      <Route
        path={Environment.ADMIN_AULAS}
        element={
          <MenuLateral>
            <ListagemDeAula />
          </MenuLateral>
        }
      />
      <Route
        path={Environment.ADMIN_AULAS_DETALHE}
        element={
          <MenuLateral>
            <DetalheDeAula />
          </MenuLateral>
        }
      />

      <Route
        path="/dashboard"
        element={
          <MenuLateral>
            <Dashboard title="dashboards" />
          </MenuLateral>
        }
      />

      {/* <Route path="*" element={<Navigate to="/admin/usuarios" />} /> */}
    </Routes>
  );
};