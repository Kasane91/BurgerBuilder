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
`;

const Input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          className="InputElement"
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select className="InputElement" value={props.value}>
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
