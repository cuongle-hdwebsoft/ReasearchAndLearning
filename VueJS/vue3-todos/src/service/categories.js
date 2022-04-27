import instance from "./fetch";

export default class CategoryApi {
  static getCategories() {
    return instance({
      method: "GET",
      url: "/categories",
    })
      .then((rs) => ({
        data: rs.data,
        error: "",
        isError: false,
      }))
      .catch(() => ({
        data: [],
        error: "Load categories fail",
        isError: true,
      }));
  }
}
