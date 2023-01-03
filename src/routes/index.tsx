import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../pages/dashboard/Dashboard';


export const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/user" element={<Dashboard title="Usuários" />} />
      <Route path="/course" element={<Dashboard title="Cursos" />} />

      <Route path="*" element={<Navigate to="/user" />} />
    </Routes>
  );
};