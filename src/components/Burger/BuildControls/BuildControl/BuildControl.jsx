import React from "react";
import styled from "styled-components";

const BuildControlDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
`;

const BuildControlButton = styled.button`
  display: block;
  font: inherit;
  padding: 5px;
  margin: 0 5px;
  width: 80px;
  border: 1px solid #aa6817;
  cursor: pointer;
  outline: none;

  &:disabled {
    background-color: #ac9980;
    border: 1px solid #7e7365;
    color: #ccc;
    cursor: default;
  }

  &:hover:disabled {
    background-color: #ac9980;
    color: #ccc;
    cursor: not-allowed;
  }
`;

const LabelDiv = styled.div`
  padding: 10px;
  font-weight: bold;
  width: 80px;
`;

const MoreButton = styled(BuildControlButton)`
  background-color: #8f5e1e;
  color: white;
`;

const LessButton = styled(BuildControlButton)`
  background-color: #d39952;
  color: white;

  &:hover {
    background-color: #daa972;
    color: white;
  }
`;

const BuildControl = (props) => {
  return (
    <BuildControlDiv>
      <LabelDiv>{props.label}</LabelDiv>
      <LessButton onClick={props.removed}>Less</LessButton>
      <MoreButton onClick={props.added}>More</MoreButton>
    </BuildControlDiv>
  );
};

export default BuildControl;
