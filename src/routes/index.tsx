import { Routes, Route, Navigate } from 'react-router-dom';
import { 
  Dashboard,
  DetalheDeCurso,
  DetalheDePessoasUsuario,
  DetalheDeAula,
  ListagemDeCurso,
  ListagemDeUsuario,
  ListagemDeAula,
 } from '../pages';
import { DetalheDeSessao } from '../pages/admin/sessoes/DetalheDeSessao';
import { ListagemDeSessao } from '../pages/admin/sessoes/ListagemDeSessao';
import { MenuLateral } from '../shared/components';


export const AppRoutes = () => {

  return (
    <Routes>
      <Route
        path="/admin/usuarios"
        element={
          <MenuLateral>
            <ListagemDeUsuario />
          </MenuLateral>
        }
      />
      <Route
        path="/admin/usuarios/detalhe/:id"
        element={
          <MenuLateral>
            <DetalheDePessoasUsuario />
          </MenuLateral>
        }
      />

      <Route
        path="/admin/cursos"
        element={
          <MenuLateral>
            <ListagemDeCurso />
          </MenuLateral>
        }
      />
      <Route
        path="/admin/cursos/detalhe/:id"
        element={
          <MenuLateral>
            <DetalheDeCurso />
          </MenuLateral>
        }
      />

      <Route
        path="/admin/cursos/sessoes/:idCourse"
        element={
          <MenuLateral>
            <ListagemDeSessao />
          </MenuLateral>
        }
      />
      <Route
        path="/admin/cursos/sessoes/detalhe/:idCourse/:id"
        element={
          <MenuLateral>
            <DetalheDeSessao />
          </MenuLateral>
        }
      />

      <Route
        path="/admin/cursos/sessoes/aulas/:idClass"
        element={<ListagemDeAula />}
      />
      <Route
        path="/admin/cursos/sessoes/aulas/detalhe/:idClass/:id"
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