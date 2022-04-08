import { fetchAuth } from "../../common/utils/fetch";
import { ICategory } from "../../modules/products/constant";

export default class CategoryApi {
  public static getAll(params?: any) {
    return fetchAuth("GET", "/categories", null, { params }).then((result) => {
      return {
        error: null,
        total: parseInt(result.headers["x-total-count"]),
        data: result.data as ICategory[],
      };
    });
  }

  public static getById(id: string | number) {
    return fetchAuth("GET", "/categories/" + id, null).then((result) => {
      return {
        error: null,
        data: result.data as ICategory,
      };
    });
  }

  public static create(data: Omit<ICategory, "id">) {
    return fetchAuth("POST", "/categories/", data).then((result) => {
      return {
        error: null,
        data: result.data,
      };
    });
  }

  public static update(data: ICategory) {
    return fetchAuth("PUT", "/categories/" + data.id, data).then((result) => {
      return {
        error: null,
        data: result.data,
      };
    });
  }

  public static delete(id: string | number) {
    return fetchAuth("DELETE", "/categories/" + id, null).then((result) => {
      return {
        error: null,
        data: result.data,
      };
    });
  }
}
