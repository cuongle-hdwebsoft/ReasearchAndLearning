import {
  IMessage,
  INotificationAction,
  IWatchHistoryAction,
  WATCH_HISTORY_SAGA,
  WATCH_NOTIFICATION_SAGA,
} from "./constant";

export const errorActionSaga = (payload: IMessage): INotificationAction => {
  return {
    type: WATCH_NOTIFICATION_SAGA,
    payload,
  };
};

export const historyActionSaga = (payload: string): IWatchHistoryAction => {
  return {
    type: WATCH_HISTORY_SAGA,
    payload: payload,
  };
};
