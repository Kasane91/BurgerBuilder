import React from "react";
import styled from "styled-components";

const InputDiv = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;

  .Label {
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
  }

  .InputElement {
      outline: none,
      border: 1px solid #ccc;
      background-color: white;
      font: inherit;
      padding: 6px 10px;
      display: block;
      width: 100%;
      box-sizing: border-box;
  }

  .InputElement:focus {
      outline: none;
      background-color: #ccc
  }

  .Invalid {
    border: 1px solid red;
   

  }
`;

const Input = (props) => {
  let activeClassName = "InputElement";

  if (props.invalid && props.validationRequired && props.touched) {
    activeClassName = "InputElement Invalid";
  }

  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          className={activeClassName}
          value={props.value}
          onChange={(event) => {
            props.changed(event, props.name);
          }}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={(event) => {
            props.changed(event, props.name);
          }}
          className={activeClassName}
          value={props.value}
        >
          {props.elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = null;
      break;
  }
  return (
    <InputDiv>
      <label className="Label" htmlFor="">
        {props.label}
      </label>
      {inputElement}
    </InputDiv>
  );
};

export default Input;
