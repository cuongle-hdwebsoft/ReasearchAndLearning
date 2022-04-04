import { fetch, fetchAuth } from "../../common/utils/fetch";

interface IUser {
  id: string | number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  username: string;
  password: string;
}

export default class UserApi {
  public static login(username: string, password: string): Promise<IUser | string> {
    return fetch("GET", `/users?username=${username}&password=${password}`)
      .then((rs) => {
        if (!rs.data[0]) {
          return null;
        }

        return rs.data[0];
      })
      .catch(() => new Error("Fail to API"));
  }

  public static getMe(): Promise<IUser | string> {
    return fetchAuth("GET", `/users?username=${localStorage.getItem("username")}`)
      .then((rs) => {
        if (!rs.data[0]) {
          return null;
        }

        return rs.data[0];
      })
      .catch(() => new Error("Fail to API"));
  }
}
