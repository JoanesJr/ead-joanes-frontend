import { Api } from "./axios-config";
import { IApiLogin, IApiLoginResponse } from "./interfaces";

export class LoginService {

  static async Login(userLogin: IApiLogin): Promise<IApiLoginResponse> {
    const { data } = await Api.post("/user/auth/login", userLogin);
    if (data.access_token) {
      Api.defaults.headers["Authorization"] = "Bearer " + data.access_token;
      localStorage.setItem("apiToken", data.access_token);
      localStorage.setItem("username", userLogin.username);

      return data;
    }
      
  }

   static async ValidateLogin(): Promise<any> {
    const access_token = localStorage.getItem("apiToken");
    Api.defaults.headers["Authorization"] = "Bearer " + access_token;
    Api.post("/user/auth/login/validate").then(data => {
      // console.log("deu bom");
      // console.log(data);
    }).catch(err => {
      // console.log("deu ruim");
      // console.log(err);
      // localStorage.removeItem("apiToken");
      // localStorage.removeItem("username");
    });

  }

}
