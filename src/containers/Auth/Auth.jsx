import React, { useState } from "react";
import styled from "styled-components";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Buttons/Button";

const AuthDataDiv = styled.div`
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

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "youremailadress@email.com",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const handleChange = (event, controlName) => {
    console.log(event.target.value);
    console.log(controlName);
  };

  const checkValidty = (value, rules) => {
    let isValid = false;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "";
    }

    if (rules.minLength) {
      isValid = value.length > 6 && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  const formElementsArray = [];

  for (let controlParam in controls) {
    formElementsArray.push({
      id: controlParam,
      config: controls[controlParam],
    });
  }
  const submitForm = formElementsArray.map((formElement) => {
    return (
      <Input
        elementType={formElement.config.elementType}
        key={formElement.id}
        elementConfig={formElement.config.elementConfig}
        name={formElement.id}
        invalid={!formElement.config.valid}
        validationRequired={formElement.config.validation}
        value={formElement.config.value}
        changed={handleChange}
        touched={formElement.config.touched}
      />
    );
  });

  return (
    <AuthDataDiv>
      {submitForm}
      <Button type="primary">SUBMIT</Button>
    </AuthDataDiv>
  );
};

export default Auth;
