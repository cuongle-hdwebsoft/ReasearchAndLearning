import { call, put, all, takeEvery, takeLatest, take, fork, actionChannel, select } from "redux-saga/effects";
import { RootState } from "../redux";

function* clickButtonTakeEvery(action: any) {
  console.log(action);
  yield put({ type: "CLICK_BUTTON_TAKE_EVERY", payload: action.payload.time });
}

function* clickButtonTakeLatest() {
  const fetchAPI = (date: Date) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(date);
      }, 3000);
    });
  };

  const currentCountLatest: number = yield select<(state: RootState) => number>(
    (state) => state["MODULE_TODO"].countTakeLatest,
  );
  console.log("current Count Latest", currentCountLatest);

  const rs: Date = yield call(fetchAPI, new Date());

  console.log(call(fetchAPI, new Date()));
  yield put({ type: "CLICK_BUTTON_TAKE_LATEST", payload: rs });
}

function* watchTodo() {
  console.log("Start todoSaga");
  yield takeEvery("CLICK_BUTTON_TAKE_EVERY_SAGA", clickButtonTakeEvery);
  yield takeLatest("CLICK_BUTTON_TAKE_LATEST_SAGA", clickButtonTakeLatest);
}

function* watchUser() {
  console.log("Start userSaga");
}

function* watchHelloWorld() {
  console.log("Start helloWorldSaga");
}

export default function* rootSaga() {
  yield all([watchTodo(), watchHelloWorld(), watchUser()]);

  // while (true) {
  //   yield take("MY_REQUEST"); //blocking
  //   console.log(1);
  //   yield take("MY_REQUEST"); //blocking
  //   console.log(2);
  // }
}
