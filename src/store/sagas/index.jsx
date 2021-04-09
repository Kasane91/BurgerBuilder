import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "../sagas/authSaga";
import { getIngredients } from "../sagas/burgerSaga";
import { all, fork, takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";

export function* watchAsync() {
  yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_FETCH_STATE, authCheckStateSaga);
  yield takeEvery(actionTypes.FETCH_INITIAL_INGREDIENTS, getIngredients);
}

// export function* watchBurger() {
//   yield takeEvery(actionTypes.FETCH_INITIAL_INGREDIENTS, getIngredients);
// }

// export function* rootSaga() {
//   yield all[(fork(watchAuth), fork(watchBurger))];
// }

// export default rootSaga;
