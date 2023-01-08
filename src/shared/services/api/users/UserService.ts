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
    const { data } = await Api.get("/user/active/all");
    const users = data;

    return users;
  }

  async getAllAdmins(): Promise<any> {
    const { data } = await Api.get("/user/admin/all");
    const users = data;

    return users;
  }

  async getAllAdminsActive(): Promise<any> {
    const { data } = await Api.get("/user/active/admin");
    const users = data;

    return users;
  }

  async getById(id: string): Promise<any> {
    const { data } = await Api.get(`/user/${id}`);
    const user = data;

    return user;
  }

  async create(obj: object): Promise<any> {
    const { data } = await Api.post("/user", obj);
    const user = data;

    return user;
  }

  async updateById(id: string, obj: object): Promise<any> {
    const { data } = await Api.patch(`/user/${id}`, obj);
    const user = data;

    return user;
  }

  async deleteById(id: string): Promise<any> {
    const { data } = await Api.delete(`/user/${id}`);
    const user = data;

    return user;
  }

  async relationCourse(obj: object): Promise<any> {
    const { data } = await Api.post("/user/course/add", obj);
    const userCourse = data;

    return userCourse;
  }
}
