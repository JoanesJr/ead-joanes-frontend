import { LocalStorage } from "../../localStorage";
import { Api } from "../axios-config";

export class CompletedClassService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor

  static async getAll(): Promise<any | Error> {
    try {
      Api.defaults.headers["Authorization"] =
        "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
      const { data } = await Api.get(`/completed-class`);
      const classys = data;

      return classys;

      // return new Error("Erro ao listar os registros.");
    } catch (error) {
      console.error(error);
      return new Error(
        (error as { message: string }).message || "Erro ao marcar aula."
      );
    }
  }

  static async getToClass(id_user: string, id_class: string | number): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
    const { data } = await Api.get(`/completed-class/${id_user}/${id_class}`);
    const classy = data;

    return classy;
  }

  static async create(obj: object): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
      console.log("creted");
      console.log(obj)
    const { data } = await Api.post("/completed-class", obj);
    console.log("res created");
    console.log(data);
    const user = data;

    return user;
  }

  static async delete(obj: object): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
      console.log("delted")
      console.log(obj)
    const { data } = await Api.post(`/completed-class/cancel`, obj);
    console.log("res");
    console.log(data);
    const classy = data;

    return classy;
  }

  static async getCoursePercent(idCourse: string | number, idUser: string | number): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
    const { data } = await Api.get(`/completed-class/percent/${idCourse}/${idUser}`);
    const classy = data;

    return classy;
  }

  static async findByUserCourse(idCourse: string | number, idUser: string | number): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + LocalStorage.getItem("JSF_TK_A_U_L");
    const { data } = await Api.get(`/completed-class/status/${idCourse}/${idUser}`);
    const classy = data;

    return classy;
  }
}
