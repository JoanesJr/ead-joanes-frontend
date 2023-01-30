import { Routes, Route, useNavigate } from "react-router-dom";
import { CoursePage, HomePage } from "../pages";
import { ResponsiveAppBar } from "../shared/components";
import { Environment } from "../shared/environment";
export const UserAppRoutes = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path={Environment.USER_HOMEPAGE}
        element={
          <ResponsiveAppBar navigate={navigate}>
            <HomePage />
          </ResponsiveAppBar>
        }
      />
      <Route
        path={Environment.USER_COURSE_PAGE}
        element={
          <ResponsiveAppBar navigate={navigate}>
            <CoursePage />
          </ResponsiveAppBar>
        }
      />

      <Route
        path={Environment.USER_CLASS}
        element={
          <ResponsiveAppBar navigate={navigate}>
            <CoursePage />
          </ResponsiveAppBar>
        }
      />

      {/* <Route path="*" element={<Navigate to="/cursos" />} /> */}
    </Routes>
  );
};
