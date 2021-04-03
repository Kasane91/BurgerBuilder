import React, { useState } from "react";
import Button from "../../../components/UI/Buttons/Button";
import styled from "styled-components";
import axios from "../../../axious-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

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
  const [contactInfo, setContactInfo] = useState({
    userName: "",
    email: "",
    address: {
      street: "",
      zipCode: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const order = {
      ingredients: props.ingredients,
      //Should be calculated server side in a real application
      price: props.totalPrice,
      customer: {
        name: contactInfo.userName,
        address: {
          street: contactInfo.address.street,
          zipCode: contactInfo.address.zipCode,
        },
        email: contactInfo.email,
      },
      deliveryMethod: "ASAP",
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

  let form = (
    <form action="/">
      <input name="name" placeholder="Your Name" type="text" />
      <input type="email" name="email" placeholder="yourname@email.com" />
      <input type="text" name="street" placeholder="I live here street" />
      <input type="text" name="zipCode" placeholder="ZipCode" />
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
