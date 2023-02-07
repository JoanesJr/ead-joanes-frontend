import { Api } from "../axios-config";

export class CompletedClassService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor

  static async getAll(): Promise<any | Error> {
    try {
      Api.defaults.headers["Authorization"] =
        "Bearer " + localStorage.getItem("apiToken");
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
      "Bearer " + localStorage.getItem("apiToken");
    const { data } = await Api.get(`/completed-class/${id_user}/${id_class}`);
    const classy = data;

    return classy;
  }

  static async create(obj: object): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
    const { data } = await Api.post("/completed-class", obj);
    const user = data;

    return user;
  }


  static async delete(obj: object): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
    const { data } = await Api.delete(`/completed-class`, obj);
    const classy = data;

    return classy;
  }
}
