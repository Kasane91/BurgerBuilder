import * as actionTypes from "./actionTypes";
import axios from "../../axious-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    console.log("Working: " + token);
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        console.log(response.data.name);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAILURE,
    error: error,
  };
};

export const fetchedOrders = (token) => {
  return (dispatch) => {
    axios
      .get("/orders.json?auth=" + token)
      .then((response) => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key,
          });
        }

        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
