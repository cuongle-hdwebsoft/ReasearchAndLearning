import { AxiosResponse } from "axios";
import { fetchAuth } from "../../common/utils/fetch";
import { IFormProduct, IParams, IProduct } from "../../modules/products/constant";

export default class ProductApi {
  public static getAll(params?: IParams) {
    return fetchAuth("GET", "/products", null, {
      params,
    }).then((result: AxiosResponse<IProduct[]>) => {
      if (result.status !== 200) {
        return {
          data: [],
          totalProducts: 0,
          error: "Load fail",
        };
      }

      return {
        data: result.data,
        totalProducts: parseInt(result.headers["x-total-count"]),
        error: null,
      };
    });
  }

  public static create(data: IFormProduct) {
    return fetchAuth("POST", "/products", data).then((result: AxiosResponse<IProduct>) => {
      if (result.status !== 201) {
        return {
          data: null,
          error: "Create fail",
        };
      }

      return {
        data: result.data,
        error: null,
      };
    });
  }

  public static edit(data: IFormProduct & { id: string | number }) {
    return fetchAuth("PUT", "/products/" + data.id, data).then((result: AxiosResponse<IProduct>) => {
      if (result.status !== 200) {
        return {
          data: null,
          error: "Edit fail",
        };
      }

      return {
        data: result.data,
        error: null,
      };
    });
  }

  public static delete(id: string | number) {
    return fetchAuth("DELETE", "/products/" + id, null).then((result: AxiosResponse<IProduct>) => {
      if (result.status !== 200) {
        return {
          data: null,
          error: "Delete fail",
        };
      }

      return {
        data: null,
        error: null,
      };
    });
  }
}
