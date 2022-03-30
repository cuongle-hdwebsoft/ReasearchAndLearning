import { takeEvery } from "redux-saga/effects";
import { INotificationAction, WATCH_NOTIFICATION_SAGA } from "./constant";

export function* watchNotification(action: INotificationAction) {
  window &&
    window.app &&
    window.app.enqueueSnackbar &&
    window.app.enqueueSnackbar(action.payload.message, {
      variant: action.payload.type,
    });
}

export function* watchApp() {
  yield takeEvery(WATCH_NOTIFICATION_SAGA, watchNotification);
}
