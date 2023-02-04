import { Api } from "../axios-config";
import { ICourse } from "../interfaces";

export class CourseService {


  static async getAll(busca: string): Promise<ICourse[] | Error> {
    try {
      Api.defaults.headers["Authorization"] = "Bearer " + localStorage.getItem("apiToken");
      const { data } = await Api.get(`/course?busca=${busca}`);
      const courses = data;

      return courses;

      // return new Error("Erro ao listar os registros.");
    } catch (error) {
      console.error(error);
      return new Error(
        (error as { message: string }).message || "Erro ao listar os registros."
      );
    }
  }

  static async updateImage(id: string, obj: any): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
   
    const { data } = await Api.patch(`/course/profile/image/${id}`, obj);
    const course = data;

    return course;
  }

  static async getAllActives(): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
   
    const { data } = await Api.get("/course/active/all");
    const courses = data;

    return courses;
  }

  static async getAllAdmins(): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
   
    const { data } = await Api.get("/course/admin/all");
    const courses = data;

    return courses;
  }

  static async getAllAdminsActive(): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
   
    const { data } = await Api.get("/course/active/admin");
    const courses = data;

    return courses;
  }

  static async getById(id: string): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
   
    const { data } = await Api.get(`/course/${id}`);
    const course = data;

    return course;
  }

  static async create(obj: object): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
   
    const { data } = await Api.post("/course", obj);
    const course = data;

    return course;
  }

  static async updateById(id: string, obj: object): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
   
    const { data } = await Api.patch(`/course/${id}`, obj);
    const course = data;

    return course;
  }

  static async deleteById(id: string): Promise<any> {
    Api.defaults.headers["Authorization"] =
      "Bearer " + localStorage.getItem("apiToken");
   
    const { data } = await Api.delete(`/course/${id}`);
    const course = data;

    return course;
  }
}
