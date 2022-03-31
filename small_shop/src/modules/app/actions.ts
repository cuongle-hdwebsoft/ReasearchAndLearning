import {
  IMessage,
  INotificationAction,
  IWatchHistoryAction,
  WATCH_HISTORY_SAGA,
  WATCH_NOTIFICATION_SAGA,
} from "./constant";

export const errorAction = (payload: IMessage): INotificationAction => {
  return {
    type: WATCH_NOTIFICATION_SAGA,
    payload,
  };
};

export const historyAction = (payload: string): IWatchHistoryAction => {
  return {
    type: WATCH_HISTORY_SAGA,
    payload: payload,
  };
};
