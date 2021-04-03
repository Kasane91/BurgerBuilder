import React from "react";
import Order from "./Order/Order";

import axios from "../../axious-orders";

const Orders = () => {
  return (
    <div>
      <Order />
      <Order />
    </div>
  );
};

export default Orders;
