import { Routes, Route, Navigate } from "react-router-dom";
import {
  Dashboard,
  DetalheDeCurso,
  DetalheDePessoasUsuario,
  DetalheDeAula,
  ListagemDeCurso,
  ListagemDeUsuario,
  ListagemDeAula,
  Cursos,
  LoginPageAdmin,
} from "../pages";
import { DetalheDeSessao } from "../pages/admin/sessoes/DetalheDeSessao";
import { ListagemDeSessao } from "../pages/admin/sessoes/ListagemDeSessao";
import { MenuLateral, ValideLogin } from "../shared/components";
import { Environment } from "../shared/environment";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path={Environment.ADMIN_LOGIN} element={<LoginPageAdmin />} /> */}
      <Route
        path={Environment.ADMIN_USUARIOS_CURSOS}
        element={
          <ValideLogin type="admin">
            <MenuLateral>
              <Cursos />
            </MenuLateral>
          </ValideLogin>
        }
      />
      <Route
        path={Environment.ADMIN_USUARIOS_DETALHE}
        element={
          <ValideLogin type="admin">
            <MenuLateral>
              <DetalheDePessoasUsuario />
            </MenuLateral>
          </ValideLogin>
        }
      />

      <Route
        path={Environment.ADMIN_CURSOS}
        element={
          <ValideLogin type="admin">
            <MenuLateral>
              <ListagemDeCurso />
            </MenuLateral>
          </ValideLogin>
        }
      />
      <Route
        path={Environment.ADMIN_USUARIOS}
        element={
          <ValideLogin type="admin">
            <MenuLateral>
              <ListagemDeUsuario />
            </MenuLateral>
          </ValideLogin>
        }
      />
      <Route
        path={Environment.ADMIN_CURSOS_DETALHE}
        element={
          <ValideLogin type="admin">
            <MenuLateral>
              <DetalheDeCurso />
            </MenuLateral>
          </ValideLogin>
        }
      />

      <Route
        path={Environment.ADMIN_SESSOES}
        element={
          <ValideLogin type="admin">
            <MenuLateral>
              <ListagemDeSessao />
            </MenuLateral>
          </ValideLogin>
        }
      />
      <Route
        path={Environment.ADMIN_SESSOES_DETALHE}
        element={
          <ValideLogin type="admin">
            <MenuLateral>
              <DetalheDeSessao />
            </MenuLateral>
          </ValideLogin>
        }
      />

      <Route
        path={Environment.ADMIN_AULAS}
        element={
          <ValideLogin type="admin">
            <MenuLateral>
              <ListagemDeAula />
            </MenuLateral>
          </ValideLogin>
        }
      />
      <Route
        path={Environment.ADMIN_AULAS_DETALHE}
        element={
          <ValideLogin type="admin">
            <MenuLateral>
              <DetalheDeAula />
            </MenuLateral>
          </ValideLogin>
        }
      />

      <Route
        path={Environment.ADMIN_DASHBOARD}
        element={
          <ValideLogin type="admin">
            <MenuLateral>
              <Dashboard title="Dashboard" />
            </MenuLateral>
          </ValideLogin>
        }
      />

      {/* <Route path="*" element={<Navigate to="/admin/usuarios" />} /> */}
    </Routes>
  );
};
