import { Routes, Route, Navigate } from 'react-router-dom';
import { 
  Dashboard,
  ListagemDeUsuario
 } from '../pages';


export const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/usuario" element={<ListagemDeUsuario />} />
      <Route path="/curso" element={<Dashboard title="Cursos" />} />

      <Route path="*" element={<Navigate to="/usuario" />} />
    </Routes>
  );
};