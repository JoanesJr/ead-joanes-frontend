import { Routes, Route, useNavigate } from "react-router-dom";
import { CoursePage, DashboardUser, HomePage, LoginPage, PerfilPage, BuyPage } from "../pages";
import { ResponsiveAppBar, ValideLogin } from "../shared/components";
import { Environment } from "../shared/environment";

export const UserAppRoutes = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path={Environment.USER_LOGIN} element={<LoginPage />} />
      {/* <Route
        path={Environment.USER_LOGIN}
        element={
          <ValideLogin>
            <ResponsiveAppBar navigate={navigate}>
              <HomePage />
            </ResponsiveAppBar>
          </ValideLogin>
        }
      /> */}
      <Route
        path={Environment.USER_HOMEPAGE}
        element={
          <ValideLogin>
            <ResponsiveAppBar navigate={navigate}>
              <HomePage />
            </ResponsiveAppBar>
          </ValideLogin>
        }
      />
      <Route
        path={Environment.USER_BUY}
        element={
          <ValideLogin>
            <ResponsiveAppBar navigate={navigate}>
              <BuyPage />
            </ResponsiveAppBar>
          </ValideLogin>
        }
      />
      <Route
        path={Environment.USER_PERFIL}
        element={
          <ValideLogin>
            <ResponsiveAppBar navigate={navigate}>
              <PerfilPage />
            </ResponsiveAppBar>
          </ValideLogin>
        }
      />
      <Route
        path={Environment.USER_COURSE_PAGE}
        element={
          <ValideLogin>
            <ResponsiveAppBar navigate={navigate}>
              <CoursePage />
            </ResponsiveAppBar>
          </ValideLogin>
        }
      />

      <Route
        path={Environment.USER_CLASS}
        element={
          <ValideLogin>
            <ResponsiveAppBar navigate={navigate}>
              <CoursePage />
            </ResponsiveAppBar>
          </ValideLogin>
        }
      />

      <Route
        path={Environment.USER_DASHBOARD}
        element={
          <ValideLogin>
            <ResponsiveAppBar navigate={navigate}>
              <DashboardUser />
            </ResponsiveAppBar>
          </ValideLogin>
        }
      />

      {/* <Route path="*" element={<Navigate to="/cursos" />} /> */}
    </Routes>
  );
};
