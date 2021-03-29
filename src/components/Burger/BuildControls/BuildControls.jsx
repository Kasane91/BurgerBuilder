import React from "react";
import styled from "styled-components";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const StyledDiv = styled.div`
  width: 100%;
  background-color: #cf8f2e;
  display: flex;
  flex-flow: column;
  align-items: center;
  box-shadow: 0 2px 1px #ccc;
  margin: auto;
  padding: 10px 0;
`;

const BuildControls = (props) => {
  return (
    <StyledDiv>
      {controls.map((control) => {
        return <BuildControl key={control.label} label={control.label} />;
      })}
    </StyledDiv>
  );
};

export default BuildControls;
