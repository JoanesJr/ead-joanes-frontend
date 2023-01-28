import { Routes, Route, Navigate } from "react-router-dom";
import { CoursePage, HomePage } from "../pages";
import { NestedList, ResponsiveAppBar } from "../shared/components";
export const UserAppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/cursos"
        element={
          <ResponsiveAppBar>
            <HomePage />
          </ResponsiveAppBar>
        }
      />
      <Route
        path="/cursos/:id"
        element={
          <ResponsiveAppBar>
              <CoursePage />
          </ResponsiveAppBar>
        }
      />

      <Route
        path="/cursos/:id/aula"
        element={
          <ResponsiveAppBar>
              <CoursePage />
          </ResponsiveAppBar>
        }
      />

      {/* <Route path="*" element={<Navigate to="/cursos" />} /> */}
    </Routes>
  );
};
