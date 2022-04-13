import axios from "axios";
import { IPost } from "../modules/posts/interface/post";

export default class PostApi {
  public static getAll(params: {
    _limit?: number;
    _page?: number;
    filter?: any;
  }) {
    console.log(params.filter);
    return axios({
      method: "GET",
      url: "http://localhost:3001/posts",
      params: {
        _limit: params._limit,
        _page: params._page,
        ...params.filter,
      },
    }).then((rs) => {
      return {
        data: rs.data as unknown as IPost[],
        total: parseInt(rs.headers["x-total-count"]),
      };
    });
  }
}
