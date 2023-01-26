import {ApiService} from "../ApiService";
import { Api } from "../axios-config";
import { IApiLogin, IClass } from "../interfaces";

export class ClassService extends ApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(userLogin: IApiLogin) {
    super(userLogin);
    this.Login(userLogin);
  }

  async getAll(busca: string): Promise<IClass[] | Error> {
    try {
      await this.checkLogin();
      const { data } = await Api.get(`/class?busca=${busca}`);
      const classys = data;

      return classys;

      // return new Error("Erro ao listar os registros.");
    } catch (error) {
      console.error(error);
      return new Error(
        (error as { message: string }).message || "Erro ao listar os registros."
      );
    }
  }

  async getAllActives(): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.get("/class/active/all");
    const classys = data;

    return classys;
  }

  async getByCourse(id: string): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.get(`/class/course/${id}`);
    const classys = data;

    return classys;
  }

  async getById(id: string): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.get(`/class/${id}`);
    const classy = data;

    return classy;
  }

  async create(obj: object): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.post("/class", obj);
    const classy = data;

    return classy;
  }

  async updateById(id: string, obj: object): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.patch(`/class/${id}`, obj);
    const classy = data;

    return classy;
  }

  async updateImage(id: string, obj: any): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.patch(`/class/profile/image/${id}`, obj);
    const classy = data;

    return classy;
  }

  async deleteById(id: string): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.delete(`/class/${id}`);
    const classy = data;

    return classy;
  }
}
