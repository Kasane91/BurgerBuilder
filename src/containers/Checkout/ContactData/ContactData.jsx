import React, { useState } from "react";
import Button from "../../../components/UI/Buttons/Button";
import styled from "styled-components";
import axios from "../../../axious-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

const ContactDataDiv = styled.div`
  margin: 20px auto;
  width: 80%;
  text-align: center;
  box-shadow: 0 2px 3px #ccc;
  border: 1px solid #eee;
  padding: 10px;
  box-sizing: border-box;
  @media (min-width: 600px) {
    width: 500px;
  }
  & input {
    display: block;
  }
`;

const ContactData = (props) => {
  const [orderInfo, setOrderInfo] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name Here",
      },
      value: "",
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "name@address.com",
      },
      value: "",
    },

    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Address @ FakeStreet 123",
      },
      value: "",
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP",
      },
      value: "",
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          {
            value: "fastest",
            displayValue: "Fastest",
          },
          {
            value: "cheapest",
            displayValue: "Cheapest",
          },
        ],
      },
    },
  });

  const [loading, setLoading] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const order = {
      ingredients: "props.ingredients",
      //Should be calculated server side in a real application
      price: "props.totalPrice",
      customer: {
        name: "contactInfo.userName",
        address: {
          street: "contactInfo.address.street",
          zipCode: "contactInfo.address.zipCode",
        },
        email: "contactInfo.email",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayValue: "Fastest",
            },
            {
              value: "cheapest",
              displayValue: "Cheapest",
            },
          ],
        },
      },
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        setLoading(false);
        props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(props);
  };

  const formElementsArray = [];

  for (let orderParam in orderInfo) {
    formElementsArray.push({
      id: orderParam,
      config: orderInfo[orderParam],
    });
  }

  console.log(formElementsArray);

  let form = (
    <form action="/">
      {/* <Input name="name" placeholder="Your Name" type="text" /> */}
      {formElementsArray.map((order) => {
        return (
          <Input
            elementType={order.config.elementType}
            key={order.id}
            elementConfig={order.config.elementConfig}
            name={order.id}
            value={order.config.value}
          />
        );
      })}

      <Button type="primary" clicked={orderHandler}>
        ORDER
      </Button>
    </form>
  );

  return (
    <ContactDataDiv>
      <h4>Enter your contact data</h4>
      {loading ? <Spinner /> : form}
    </ContactDataDiv>
  );
};

export default ContactData;
