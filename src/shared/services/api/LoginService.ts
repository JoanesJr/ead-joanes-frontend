import { LocalStorage } from "../localStorage";
import { Api } from "./axios-config";
import { IApiLogin, IApiLoginResponse } from "./interfaces";

export class LoginService {

  static async Login(userLogin: IApiLogin): Promise<IApiLoginResponse> {
    const { data } = await Api.post("/user/auth/login", userLogin);
    if (data.access_token) {
      Api.defaults.headers["Authorization"] = "Bearer " + data.access_token;
      LocalStorage.setItem("JSF_TK_A_U_L", data.access_token);
      LocalStorage.setItem("JSF_U_N_I", userLogin.username);

      return data;
    }
      
  }

   static async ValidateLogin(): Promise<any> {
    const access_token = LocalStorage.getItem("JSF_TK_A_U_L");
    Api.defaults.headers["Authorization"] = "Bearer " + access_token;
    Api.post("/user/auth/login/validate").then(data => {
      // console.log("deu bom");
      // console.log(data);
    }).catch(err => {
      // console.log("deu ruim");
      // console.log(err);
      // LocalStorage.removeItem("JSF_TK_A_U_L");
      // LocalStorage.removeItem("JSF_U_N_I");
    });

  }

}
