import React, { useEffect, useState } from "react";
import Order from "./Order/Order";

import axios from "../../axious-orders";
import withErrorHandler from "../withErrorHandler/withErrorHandler";

const Orders = () => {
  const [ingredients, setIngredients] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/orders.json")
      .then((response) => {
        setLoading(false);

        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key,
          });
        }
        console.log(fetchedOrders);
        setOrders(fetchedOrders);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const orderRender = orders.map((order) => {
    return (
      <Order
        ingredients={order.ingredients}
        price={order.price}
        key={order.id}
      />
    );
  });

  return <div>{orderRender}</div>;
};

export default withErrorHandler(Orders, axios);
