import { Routes, Route, Navigate } from 'react-router-dom';
import { 
  Dashboard,
  DetalheDeCurso,
  DetalheDePessoasUsuario,
  ListagemDeCurso,
  ListagemDeUsuario
 } from '../pages';
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

      <Route path="/cursos/sessoes/:id_course" element={<ListagemDeSessao />} />
      <Route
        path="/cursos/sessoes/:id_course/:id"
        element={<ListagemDeSessao />}
      />

      <Route path="/dashboard" element={<Dashboard title="dashboards" />} />

      <Route path="*" element={<Navigate to="/usuarios" />} />
    </Routes>
  );
};