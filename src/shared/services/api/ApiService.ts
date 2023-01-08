import { Api } from "./axios-config";
import { IApiLogin, IApiLoginResponse } from "./interfaces";

export class ApiService {
  private userLogin: IApiLogin;

  constructor(userLogin: IApiLogin) {
    this.userLogin = userLogin;
  }

  async Login(userLogin: IApiLogin): Promise<IApiLoginResponse> {
    const { data } = await Api.post("/user/auth/login", userLogin);
    Api.defaults.headers["Authorization"] = "Bearer " + data.access_token;

    return data;
  }

  async checkLogin(): Promise<any> {
    return await this.Login(this.userLogin);
  }

}
