import React, { useState } from "react";
import Button from "../../../components/UI/Buttons/Button";
import styled from "styled-components";

import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as orderActions from "../../../store/actions/index";
import { checkValidity } from "../../../shared/utility";

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
  //@TODO Make a helper function, for real
  const [orderInfo, setOrderInfo] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name Here",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "name@address.com",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },

    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Address @ FakeStreet 123",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP",
      },
      value: "",
      validation: {
        required: true,
        validZip: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      valid: true,
      value: "fastest",
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

  const [formIsValid, setIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};

    //CREATES AN OBJECT FOR ORDER SUBMISSION CONTAINING ALL FORM DATA INPUTS
    for (let formParam in orderInfo) {
      formData[formParam] = orderInfo[formParam].value;
    }

    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

  const formElementsArray = [];

  for (let orderParam in orderInfo) {
    formElementsArray.push({
      id: orderParam,
      config: orderInfo[orderParam],
    });
  }

  const handleChange = (event, id) => {
    setOrderInfo((preValues) => {
      const updatedFormData = {
        ...preValues,
        [id]: {
          ...preValues[id],
          value: event.target.value,
          valid: checkValidity(event.target.value, preValues[id].validation),
          touched: true,
        },
      };

      let formIsValid = true;
      for (let inputID in updatedFormData) {
        formIsValid = updatedFormData[inputID].valid && formIsValid;
      }
      setIsValid(formIsValid);

      return updatedFormData;
    });
  };

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((order) => {
        return (
          <Input
            elementType={order.config.elementType}
            key={order.id}
            elementConfig={order.config.elementConfig}
            name={order.id}
            invalid={!order.config.valid}
            validationRequired={order.config.validation}
            value={order.config.value}
            changed={handleChange}
            touched={order.config.touched}
          />
        );
      })}

      <Button type="primary" disabled={!formIsValid} clicked={orderHandler}>
        ORDER
      </Button>
    </form>
  );

  return (
    <ContactDataDiv>
      <h4>Enter your contact data</h4>
      {props.loading ? <Spinner /> : form}
    </ContactDataDiv>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(orderActions.purchaseBurger(orderData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
