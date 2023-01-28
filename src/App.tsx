import { BrowserRouter } from "react-router-dom";

import "./shared/forms/TraducoesYup";

import { AppRoutes } from "./routes";
import { MenuLateral } from "./shared/components";
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import { UserAppRoutes } from "./routes/userRoutes";

function App() {
  return (
    <AppThemeProvider>
      <DrawerProvider>

        <BrowserRouter>
          {/* <MenuLateral> */}
          <UserAppRoutes />
          <AppRoutes />
          {/* </MenuLateral> */}
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
}

export default App;
