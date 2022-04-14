import axios from "axios";
import removeEmpty from "../common/utils/removeEmpty";
import { IFilterPost, IPost } from "../modules/posts/interface/post";

export default class PostApi {
  public static getAll(params: {
    _limit?: number;
    _page?: number;
    filter?: IFilterPost;
    _sort?: string;
    _order?: string;
  }) {
    console.log(params.filter);
    return axios({
      method: "GET",
      url: "http://localhost:3001/posts",
      params: removeEmpty({
        _limit: params._limit,
        _page: params._page,
        _sort: params._sort,
        _order: params._order,
        ...params.filter,
      }),
    }).then((rs) => {
      return {
        data: rs.data as unknown as IPost[],
        total: parseInt(rs.headers["x-total-count"]),
      };
    });
  }
}
