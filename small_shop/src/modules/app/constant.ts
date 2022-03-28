export const MODULE_NAME = "APP_MODULE";

export interface IReducerApp {
  user?: {
    username: string;
    password: string;
    loginAt: string;
  };
  setting?: {
    rememberPassword: boolean;
  };
  isRunning: boolean;
}

export interface IInitActionPayload {
  createdAt: string;
  isRunning: boolean;
}
