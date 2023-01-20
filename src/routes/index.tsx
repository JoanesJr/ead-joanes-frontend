import { Routes, Route, Navigate } from 'react-router-dom';
import { 
  Dashboard,
  DetalheDeCurso,
  DetalheDePessoasUsuario,
  ListagemDeCurso,
  ListagemDeUsuario
 } from '../pages';


export const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/usuarios" element={<ListagemDeUsuario />} />
      <Route
        path="/usuarios/detalhe/:id"
        element={<DetalheDePessoasUsuario />}
      />
      <Route path="/cursos" element={<ListagemDeCurso />} />
      <Route
        path="/cursos/detalhe/:id"
        element={<DetalheDeCurso />}
      />
      <Route path="/dashboard" element={<Dashboard title="dashboards" />} />

      <Route path="*" element={<Navigate to="/usuarios" />} />
    </Routes>
  );
};