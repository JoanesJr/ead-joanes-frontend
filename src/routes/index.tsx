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
import { DetalheDeSessao } from '../pages/sessoes/DetalheDeSessao';
import { ListagemDeSessao } from '../pages/sessoes/ListagemDeSessao';


export const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/usuarios" element={<ListagemDeUsuario />} />
      <Route
        path="/usuarios/detalhe/:id"
        element={<DetalheDePessoasUsuario />}
      />

      <Route path="/cursos" element={<ListagemDeCurso />} />
      <Route path="/cursos/detalhe/:id" element={<DetalheDeCurso />} />

      <Route path="/cursos/sessoes/:idCourse" element={<ListagemDeSessao />} />
      <Route
        path="/cursos/sessoes/detalhe/:idCourse/:id"
        element={<DetalheDeSessao />}
      />

      <Route
        path="/cursos/sessoes/aulas/:idClass"
        element={<ListagemDeAula />}
      />
      <Route
        path="/cursos/sessoes/aulas/detalhe/:idClass/:id"
        element={<DetalheDeAula />}
      />

      <Route path="/dashboard" element={<Dashboard title="dashboards" />} />

      {/* <Route path="*" element={<Navigate to="/usuarios" />} /> */}
    </Routes>
  );
};