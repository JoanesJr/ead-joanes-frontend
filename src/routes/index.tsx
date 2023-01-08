import { Routes, Route, Navigate } from 'react-router-dom';
import { 
  Dashboard,
  DetalheDePessoasUsuario,
  ListagemDeUsuario
 } from '../pages';


export const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/usuarios" element={<ListagemDeUsuario />} />
      <Route path="/usuarios/detalhe/:id" element={<DetalheDePessoasUsuario />} />
      <Route path="/cursos" element={<Dashboard title="Cursos" />} />

      <Route path="*" element={<Navigate to="/usuarios" />} />
    </Routes>
  );
};