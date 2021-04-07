import React, { useEffect } from "react";
import Order from "./Order/Order";
import { connect } from "react-redux";
import axios from "../../axious-orders";
import withErrorHandler from "../withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

const Orders = (props) => {
  const { onFetchOrders, token } = props;

  useEffect(() => {
    onFetchOrders(token);
  }, [onFetchOrders, token]);

  let orderRender = props.orders.map((order) => {
    if (order.userId === props.userId) {
      return (
        <Order
          ingredients={order.ingredients}
          price={order.price}
          key={order.id}
        />
      );
    }
  });
  if (props.loading) {
    orderRender = <p>Currently there are no orders</p>;
  }

  return <div>{orderRender}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchedOrders(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
