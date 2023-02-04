
import { Api } from "../axios-config";
import { IApiLogin, ISection } from "../interfaces";

export class SectionService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  static async getAll(busca: string): Promise<ISection[] | Error> {
    try {
     Api.defaults.headers["Authorization"] =
       "Bearer " + localStorage.getItem("apiToken");
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

  static async getAllActives(): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
   
    const { data } = await Api.get("/section/active/all");
    const sections = data;

    return sections;
  }

  static async getByCourse(id: string): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
   
    const { data } = await Api.get(`/section/course/${id}`);
    const sections = data;

    return sections;
  }

  static async getById(id: string): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
   
    const { data } = await Api.get(`/section/${id}`);
    const section = data;

    return section;
  }

  static async create(obj: object): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
   
    const { data } = await Api.post("/section", obj);
    const section = data;

    return section;
  }

  static async updateById(id: string, obj: object): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
   
    const { data } = await Api.patch(`/section/${id}`, obj);
    const section = data;

    return section;
  }

  static async deleteById(id: string): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
   
    const { data } = await Api.delete(`/section/${id}`);
    const section = data;

    return section;
  }
}
