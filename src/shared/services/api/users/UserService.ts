import {ApiService} from "../ApiService";
import { Api } from "../axios-config";
import { IApiLogin, IUser } from "../interfaces";

export class UserService extends ApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(userLogin: IApiLogin) {
    super(userLogin);
    this.Login(userLogin);
  }

  async getAll(busca: string): Promise<IUser[] | Error> {
    try {
      await this.checkLogin();
      const { data } = await Api.get(`/user?busca=${busca}`);
      const users = data;

      return users;

      // return new Error("Erro ao listar os registros.");
    } catch (error) {
      console.error(error);
      return new Error(
        (error as { message: string }).message || "Erro ao listar os registros."
      );
    }
  }

  async getAllActives(): Promise<any> {
    const users = await Api.get("/user/active/all");

    return users;
  }

  async getAllAdmins(): Promise<any> {
    const users = await Api.get("/user/admin/all");

    return users;
  }

  async getAllAdminsActive(): Promise<any> {
    const users = await Api.get("/user/active/admin");

    return users;
  }

  async getById(id: string): Promise<any> {
    const user = await Api.get(`/user/${id}`);

    return user;
  }

  async create(data: object): Promise<any> {
    const user = await Api.post("/user", data);

    return user;
  }

  async updateById(data: object): Promise<any> {
    const user = await Api.patch("/user", data);

    return user;
  }

  async deleteById(id: string): Promise<any> {
    const user = await Api.delete(`/user/${id}`);

    return user;
  }

  async relationCourse(data: object): Promise<any> {
    const userCourse = await Api.post("/user/course/add", data);

    return userCourse;
  }
}
