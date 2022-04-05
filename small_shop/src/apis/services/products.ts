import { AxiosResponse } from "axios";
import { fetchAuth } from "../../common/utils/fetch";
import { IProduct } from "../../modules/products/constant";

export default class ProductApi {
  public static getAll(params: { _limit: number; _page: number; [value: string]: number | string | boolean }) {
    return fetchAuth("GET", "/products", null, {
      params,
    }).then((result: AxiosResponse<IProduct[]>) => {
      return {
        data: result.data,
        totalProducts: parseInt(result.headers["x-total-count"]),
        error: null,
      };
    });
  }
}
