import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axious-orders";

export function* getIngredients(action) {
  try {
    const response = yield axios.get("/ingredients.json");
    console.log(response);
    yield put(actions.setIngredients(response.data));
  } catch (err) {
    yield put(actions.fetchedIngredientsFailed());
  }
}
