import { BrowserRouter } from "react-router-dom";
import "./shared/forms/TraducoesYup";

import { AppRoutes } from "./routes";
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";
import { UserAppRoutes } from "./routes/userRoutes";
import { AuthProvider } from "./shared/contexts";

import { initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago('TEST-ac39c392-7c8f-4391-a5da-1c151f9e7ebf');


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
