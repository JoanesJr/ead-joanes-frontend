import {ApiService} from "../ApiService";
import { Api } from "../axios-config";
import { IApiLogin, IUser } from "../interfaces";

export class UserService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor

  static async getAll(busca: string): Promise<IUser[] | Error> {
    try {
      Api.defaults.headers["Authorization"] =
        "Bearer " + localStorage.getItem("apiToken");
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

  static async getAllActives(): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
    const { data } = await Api.get("/user/active/all");
    const users = data;

    return users;
  }

  static async getAllAdmins(): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
    const { data } = await Api.get("/user/admin/all");
    const users = data;

    return users;
  }

  static async getAllAdminsActive(): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
    const { data } = await Api.get("/user/active/admin");
    const users = data;

    return users;
  }

  static async getById(id: string): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
    const { data } = await Api.get(`/user/${id}`);
    const user = data;

    return user;
  }

  static async getByEmail(obj: { email: string }): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
    const { data } = await Api.post(`/user/email`, obj);
    const user = data;

    return user;
  }

  static async create(obj: object): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
    const { data } = await Api.post("/user", obj);
    const user = data;

    return user;
  }

  static async updateById(id: string, obj: object): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
    const { data } = await Api.patch(`/user/${id}`, obj);
    const user = data;

    return user;
  }

  static async deleteById(id: string): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
    const { data } = await Api.delete(`/user/${id}`);
    const user = data;

    return user;
  }

  static async relationCourseAdd(obj: object): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");

    const { data } = await Api.post("/user/course/add", obj);
    const userCourse = data;

    return userCourse;
  }

  static async relationCourseRemove(obj: object): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");

    const { data } = await Api.post("/user/course/remove", obj);
    const userCourse = data;

    return userCourse;
  }
}
