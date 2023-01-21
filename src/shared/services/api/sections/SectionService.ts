import {ApiService} from "../ApiService";
import { Api } from "../axios-config";
import { IApiLogin, ISection } from "../interfaces";

export class SectionService extends ApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(sectionLogin: IApiLogin) {
    super(sectionLogin);
    this.Login(sectionLogin);
  }

  async getAll(busca: string): Promise<ISection[] | Error> {
    try {
      await this.checkLogin();
      const { data } = await Api.get(`/section?busca=${busca}`);
      const sections = data;

      return sections;

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
    const { data } = await Api.get("/section/active/all");
    const sections = data;

    return sections;
  }

  async getByCourse(id: string): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.get(`/section/course/${id}`);
    const sections = data;

    return sections;
  }

  async getById(id: string): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.get(`/section/${id}`);
    const section = data;

    return section;
  }

  async create(obj: object): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.post("/section", obj);
    const section = data;

    return section;
  }

  async updateById(id: string, obj: object): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.patch(`/section/${id}`, obj);
    const section = data;

    return section;
  }

  async deleteById(id: string): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.delete(`/section/${id}`);
    const section = data;

    return section;
  }
}
