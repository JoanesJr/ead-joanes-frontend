
import { LocalStorage } from "../../localStorage";
import { Api } from "../axios-config";
import { IClass } from "../interfaces";

export class ClassService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor

  static async getAll(busca: string): Promise<IClass[] | Error> {
    try {
      Api.defaults.headers["Authorization"] =
        "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
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

  static async getAllActives(): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
    const { data } = await Api.get("/class/active/all");
    const classys = data;

    return classys;
  }

  static async getByCourse(id: string): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
    const { data } = await Api.get(`/class/course/${id}`);
    const classys = data;

    return classys;
  }

  static async getBySection(id: string): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
    const { data } = await Api.get(`/class/section/${id}`);
    const classys = data;

    return classys;
  }

  static async getById(id: string): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
    const { data } = await Api.get(`/class/${id}`);
    const classy = data;

    return classy;
  }

  static async create(obj: object): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
    const { data } = await Api.post("/class", obj);
    const classy = data;

    return classy;
  }

  static async updateById(id: string, obj: object): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
    const { data } = await Api.patch(`/class/${id}`, obj);
    const classy = data;

    return classy;
  }

  static async updateImage(id: string, obj: any): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
    const { data } = await Api.patch(`/class/profile/image/${id}`, obj);
    const classy = data;

    return classy;
  }

  static async deleteById(id: string): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
    const { data } = await Api.delete(`/class/${id}`);
    const classy = data;

    return classy;
  }

  static async getFileClass(file: string): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
   
    const { data } = await Api.get(`/getFile/${file}`);
    const course = data;

    return course;
  }

  static async setAttachment(id: string | number, file: any): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
   
    const { data } = await Api.post(`/attachment/${id}`, file);
    const course = data;

    return course;
  }

  static async getAttachmentClass(id: string | number): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
   
    const { data } = await Api.get(`/attachment/class/${id}`);
    const course = data;

    return course;
  }

  static async getAttachmentFile(file: string): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
   
    const { data } = await Api.get(`/getFile/${file}`);
    const course = data;

    return course;
  }

}
