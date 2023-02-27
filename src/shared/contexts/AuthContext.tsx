import { createContext, useState } from "react";
import { LoginService } from "../services/api";
import { IApiLogin } from "../services/api/interfaces";
import { Api } from "../services/api/axios-config";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "../services/localStorage";

interface IAuthProvider {
    children: React.ReactNode;
}

interface IContext {
  username: string;
  password: string;
  authenticated: boolean;
  handleLogin: any;
  loggout: (type?: string) => any;
}

const Context = createContext<IContext>(null);


function AuthProvider({ children }: IAuthProvider) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (objLogin: IApiLogin, type: string = "comum") => {
        LoginService.Login(objLogin).then( data => {
         setAuthenticated(true);
         setUsername(objLogin.username);
         setPassword(objLogin.password);
         navigate("/cursos");
         navigate(0)
        //  console.log("aqui")
        }).catch( err => {
            setUsername("");
            setPassword("");
            setAuthenticated(false);
            // LocalStorage.removeItem("JSF_TK_A_U_L");
            // LocalStorage.removeItem("JSF_U_N_I");
            navigate("/");
        })
        
    };

    const loggout = (type: string = "comum") => {
      LocalStorage.removeItem("JSF_TK_A_U_L");
      LocalStorage.removeItem("JSF_U_N_I");
      if (type === "admin") {
        navigate('/admin/login');
      } else {
        navigate('/');
      }
      
    }

  return (
    <Context.Provider
      value={{ username, password, handleLogin, authenticated, loggout }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider, }