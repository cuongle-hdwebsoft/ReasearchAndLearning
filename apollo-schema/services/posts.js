import axios from "axios";
import removeEmpty from "../utils/removeEmpty";

export default class PostApi {
  static getAll(params) {
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
        data: rs.data,
        total: parseInt(rs.headers["x-total-count"]),
      };
    });
  }

  static async getById(id) {
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

  static async getCommentsByPostId(postId, params) {
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
      const limit = parseInt(params._limit);
      const page = parseInt(params._page);
      const total = parseInt(rs.headers["x-total-count"]);

      return {
        data: rs.data,
        total,
        limit,
        page,
        nextPage: page * limit < total ? page + 1 : undefined,
      };
    });
  }

  static async postCommentByPostId(data) {
    return axios({
      method: "POST",
      data: data,
      url: "http://localhost:3001/comments",
    });
  }
}
