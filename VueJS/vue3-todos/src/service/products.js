import removeEmptyField from "@/utils/removeEmptyField";
import instance from "./fetch";

export default class ProductApi {
  static getAll(params) {
    return instance({
      url: "/products",
      method: "GET",
      params: removeEmptyField({
        _limit: params._limit || 8,
        _page: params._page || 1,
        _sort: params._sort,
        _oder: params._order,
        ...params.filter,
      }),
    })
      .then((rs) => ({
        data: rs.data,
        total: rs.headers["x-total-count"],
        isError: null,
        error: "",
      }))
      .catch(() => ({
        data: [],
        total: 0,
        isError: true,
        error: "Load products fail",
      }));
  }

  static getById(id) {
    return instance({
      method: "GET",
      url: "/products/" + id,
    })
      .then((rs) => {
        return {
          isError: false,
          error: "",
          data: rs.data,
        };
      })
      .catch(() => ({
        isError: false,
        error: "",
        data: null,
      }));
  }
}
