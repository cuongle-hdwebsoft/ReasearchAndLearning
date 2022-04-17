import axios from "axios";
import removeEmpty from "../common/utils/removeEmpty";
import { IComment } from "../modules/posts/interface/comment";
import { IFilterPost, IPost } from "../modules/posts/interface/post";

export default class PostApi {
  public static getAll(params: {
    _limit?: number;
    _page?: number;
    filter?: IFilterPost;
    _sort?: string;
    _order?: string;
  }) {
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

  public static async getById(id: string) {
    return axios({
      method: "GET",
      url: "http://localhost:3001/posts/" + id,
    }).then((rs) => {
      if (rs && rs.data) {
        return rs.data;
      } else {
        throw new Error("id not found");
      }
    });
  }

  public static async getCommentsByPostId(
    postId: string,
    params: {
      _limit?: number;
      _page?: number;
    }
  ) {
    return axios({
      method: "GET",
      url: "http://localhost:3001/comments?postId=" + postId,
      params: {
        _limit: params._limit,
        _page: params._page,
        _sort: "dateTime",
        _order: "desc",
      },
    }).then((rs) => {
      const limit = parseInt(params._limit as unknown as string);
      const page = parseInt(params._page as unknown as string);
      const total = parseInt(rs.headers["x-total-count"]);

      return {
        data: rs.data as IComment[],
        total,
        limit,
        page,
        nextPage: page * limit < total ? page + 1 : undefined,
      };
    });
  }

  public static async postCommentByPostId(data: Omit<IComment, "id">) {
    return axios({
      method: "POST",
      data: data,
      url: "http://localhost:3001/comments",
    });
  }
}
