import { put, takeEvery } from "redux-saga/effects";
import { INotificationAction, IWatchHistoryAction, WATCH_HISTORY_SAGA, WATCH_NOTIFICATION_SAGA } from "./constant";
import { setHistory, setToast } from "./reducer";

export function* watchNotification(action: INotificationAction) {
  yield put(
    setToast({ createdAt: new Date().toISOString(), message: action.payload.message, type: action.payload.type }),
  );
}

export function* watchHistory(action: IWatchHistoryAction) {
  yield put(setHistory({ path: action.payload, createdAt: new Date().toISOString() }));
}

export function* watchApp() {
  yield takeEvery(WATCH_NOTIFICATION_SAGA, watchNotification);
  yield takeEvery(WATCH_HISTORY_SAGA, watchHistory);
}
