import { fetchAuth } from "../../common/utils/fetch";

export default class CategoryApi {
  public static getAll() {
    return fetchAuth("GET", "/categories").then((result) => {
      if (result.status !== 200) {
        return {
          error: "Load categories fail",
          data: [],
        };
      }

      return {
        error: null,
        data: result.data,
      };
    });
  }
}
