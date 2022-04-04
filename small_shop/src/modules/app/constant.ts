import { OptionsObject, SnackbarKey, SnackbarMessage, VariantType } from "notistack";

export const MODULE_NAME = "APP_MODULE";
export const WATCH_NOTIFICATION_SAGA = "WATCH_NOTIFICATION_SAGA";
export const WATCH_HISTORY_SAGA = "WATCH_HISTORY_SAGA";

export interface IMessage {
  message: string;
  type: VariantType | undefined;
}
export interface INotificationAction {
  type: string;
  payload: IMessage;
}

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
  toast?: {
    type: VariantType | undefined;
    message: string;
    createdAt: string;
  } | null;
  history?: {
    path: string;
    createdAt: string;
  } | null;
}

export interface IInitActionPayload {
  createdAt: string;
  isRunning: boolean;
}

declare global {
  interface Window {
    app: {
      enqueueSnackbar?: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey | null;
      history: any;
      modal?: any;
    };
  }
}

export interface IToastAction {
  type: VariantType | undefined;
  message: string;
  createdAt: string;
}

export interface IHistoryAction {
  path: string;
  createdAt: string;
}

export interface IWatchHistoryAction {
  type: string;
  payload: string;
}

export interface IUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
}
