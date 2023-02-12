import { Api } from "./axios-config";
import { IApiLogin, IApiLoginResponse } from "./interfaces";

export class ApiService {

  private userLogin;

  constructor(objLogin: IApiLogin) {
    this.userLogin = objLogin;
  }

  async Login(userLogin: IApiLogin): Promise<IApiLoginResponse> {
    const { data } = await Api.post("/user/auth/login", userLogin);
    // Api.defaults.headers["Authorization"] = "Bearer " + data.access_token;
    // LocalStorage.setItem("JSF_TK_A_U_L", data.access_token);

    return data;
  }

  async checkLogin(): Promise<any> {
    return await this.Login(this.userLogin);
    return 'oi';
  }

}
