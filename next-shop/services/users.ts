import axios from "axios";
import { IUser } from "../modules/users/interface/user";

export default class UsersApi {
  public static login(username: string, password: string) {
    return axios({
      method: "GET",
      url: "http://localhost:3001/users",
      params: {
        username,
        password,
      },
    }).then((rs) => {
      if (rs.data && rs.data.length === 1) {
        return {
          user: rs.data[0],
          accessToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        };
      } else {
        throw new Error("login fail");
      }
    });
  }

  public static getMe(accessToken: string) {
    let user: any = localStorage.getItem("user");

    user = JSON.parse(user);

    return axios({
      method: "GET",
      url: "http://localhost:3001/users/" + user.id,
    }).then((rs) => {
      if (!rs.data) {
        throw new Error("load user fail");
      }

      return rs.data as IUser;
    });
  }
}
