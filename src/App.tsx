import { BrowserRouter } from "react-router-dom";
import "./shared/forms/TraducoesYup";

import { AppRoutes } from "./routes";
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import { UserAppRoutes } from "./routes/userRoutes";
import { AuthProvider } from "./shared/contexts";

function App() {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <AuthProvider>
              <UserAppRoutes />
          </AuthProvider>

          <AppRoutes />
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
}

export default App;
