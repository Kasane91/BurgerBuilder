import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Buttons/Button";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

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
    isSignUp: false,
  });
  const handleChange = (event, controlName) => {
    setControls((prevState) => {
      return {
        ...prevState,
        [controlName]: {
          ...prevState[controlName],
          value: event.target.value,
          valid: checkValidty(
            event.target.value,
            prevState[controlName].validation
          ),
          touched: true,
        },
      };
    });
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
  let submitForm = formElementsArray.map((formElement) => {
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

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(controls.isSignUp);
    props.onAuth(
      controls.email.value,
      controls.password.value,
      controls.isSignUp
    );
  };

  const signUpHandler = (event) => {
    event.preventDefault();
    setControls((prevState) => {
      return { ...prevState, isSignUp: !prevState.isSignUp };
    });
  };

  if (props.loading) {
    submitForm = <Spinner />;
  }

  let errorMessage = null;

  //TODO MAP SOME NICE ERROR MESSAGES?
  if (props.error) {
    errorMessage = <p>ERROR : {props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuth) {
    authRedirect = <Redirect to="/" />;
  }

  return (
    <AuthDataDiv>
      {authRedirect}
      <form onSubmit={onSubmitHandler}>
        {errorMessage}
        {submitForm}
        <Button type="primary">SUBMIT</Button>
        <Button type="danger" clicked={signUpHandler}>
          {" "}
          SWITCH TO {controls.isSignUp ? "SIGN IN" : "SIGN UP"}
        </Button>
      </form>
    </AuthDataDiv>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    error: state.auth.error,
    loading: state.auth.loading,
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
