import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LightTheme } from "../themes";
import { DarkTheme } from "../themes";
import { ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import { UserService } from "../services/api";
import { LocalStorage } from "../services/localStorage";

interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

interface IAppThemeProviderProps {
    children: React.ReactNode
}

interface ITheme {
    id: number;
    id_user: number;
    theme: "light" | "dark";
}

const ThemeContext = createContext({
} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {
    const [userThemeActual, setUserThemeActual] = useState<"light" | "dark">("dark");
    const [userId, setUserId] = useState<any>();
    useEffect( () => {
        const username = LocalStorage.getItem("JSF_U_N_I");
        const obj = {
          email: username,
        };
      
        UserService.getByEmail(obj)
          .then((data) => {
            setUserId(data.id);
            UserService.getUserTheme(data.id).then(({theme, id, id_user}: ITheme )=> {
                setUserId(id_user);
                setUserThemeActual(theme);
            }).catch(err => {
                console.log('error');
                // console.log(err)
            })
          })
          .catch((err) => {
            // console.log("deu ruim email")
          });
    }, [userThemeActual, userId, LocalStorage.getItem("JSF_U_N_I")]);


    const [themeName, setThemeName] = useState<"light" | "dark">(userThemeActual || 'dark');

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light' );
        setUserThemeActual(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light' );
        const obj = {
            theme: themeName,
        };

        // console.log(userId);
        if (userId) {
            UserService.updateUserTheme(userId, obj).then(dt => {
                // console.log(dt)
            }).catch(err => {
                console.log(err)
            });
        }

       
    }, []);

    const theme = useMemo(() => {
        if (themeName === 'light') return LightTheme;

        return DarkTheme;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{themeName, toggleTheme}}>
            <ThemeProvider theme={theme}>
                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
                    {children}      
                </Box>
                
            </ThemeProvider>
            
        </ThemeContext.Provider>
    );
}