import React from "react";
import styled from "styled-components";

const ListItem = styled.li`
  margin: 0;
  box-sizing: border-box;
  display: flex;
  height: 100%;
  width: auto;
  align-items: center;
`;

const AnchorTag = styled.a`
  color: white;
  text-decoration: none;
  height: 100%;
  padding: 16px 10px;
  border-bottom: 4px solid transparent;
  box-sizing: border-box;
  display: block;

  &:hover {
    background-color: #8f5c2c;
    border-bottom: 4px solid #40a4c8;
    color: white;
  }

  &.active {
    background-color: #8f5c2c;
    border-bottom: 4px solid #40a4c8;
    color: white;
  }
`;

const NavigationItem = (props) => {
  return (
    <ListItem>
      <AnchorTag className={props.className} href={props.link}>
        {props.children}
      </AnchorTag>
    </ListItem>
  );
};

export default NavigationItem;
