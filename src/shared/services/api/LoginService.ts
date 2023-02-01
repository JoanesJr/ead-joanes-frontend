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

  static async ValidateLogin(): Promise<Boolean> {
    const access_token = localStorage.getItem("apiToken");
    console.log("tokenValidate: " + access_token);
    Api.defaults.headers["Authorization"] = "Bearer " + access_token;
    const { data } = await Api.post("/user/auth/login/validate");
    console.log("validate");
    console.log(data);

    if (data.validate) {
      return true;
    }

    return false;
  }

}
