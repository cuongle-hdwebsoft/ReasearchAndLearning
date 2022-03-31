import { OptionsObject, SnackbarKey, SnackbarMessage, VariantType } from "notistack";

export const MODULE_NAME = "APP_MODULE";
export const WATCH_NOTIFICATION_SAGA = "WATCH_NOTIFICATION_SAGA";

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
    };
  }
}
