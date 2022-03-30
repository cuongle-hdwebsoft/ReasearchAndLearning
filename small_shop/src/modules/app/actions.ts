import { IMessage, INotificationAction, WATCH_NOTIFICATION_SAGA } from "./constant";

export const errorAction = (payload: IMessage): INotificationAction => {
  return {
    type: WATCH_NOTIFICATION_SAGA,
    payload,
  };
};
