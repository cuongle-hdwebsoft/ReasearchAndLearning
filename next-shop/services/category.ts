import axios from "axios";

export default class CategoryApi {
  public static getAll() {
    return axios({
      method: "GET",
      url: "http://localhost:3001/categories",
    }).then((rs) => rs.data);
  }
}
