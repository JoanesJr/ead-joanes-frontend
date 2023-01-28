import {ApiService} from "../ApiService";
import { Api } from "../axios-config";
import { IApiLogin, ICourse } from "../interfaces";

export class CourseService extends ApiService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(courseLogin: IApiLogin) {
    super(courseLogin);
    this.Login(courseLogin);
  }

  async getAll(busca: string): Promise<ICourse[] | Error> {
    try {
      await this.checkLogin();
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

  async getAllActives(): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.get("/course/active/all");
    const courses = data;

    return courses;
  }

  async getAllAdmins(): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.get("/course/admin/all");
    const courses = data;

    return courses;
  }

  async getAllAdminsActive(): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.get("/course/active/admin");
    const courses = data;

    return courses;
  }

  async getById(id: string): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.get(`/course/${id}`);
    const course = data;

    return course;
  }

  async create(obj: object): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.post("/course", obj);
    const course = data;

    return course;
  }

  async updateById(id: string, obj: object): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.patch(`/course/${id}`, obj);
    const course = data;

    return course;
  }

  async deleteById(id: string): Promise<any> {
    await this.checkLogin();
    const { data } = await Api.delete(`/course/${id}`);
    const course = data;

    return course;
  }
}
