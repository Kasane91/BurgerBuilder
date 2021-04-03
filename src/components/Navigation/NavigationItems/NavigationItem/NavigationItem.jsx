import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ListItem = styled.li`
  margin: 10px 0;
  box-sizing: border-box;
  display: block;
  width: 100%;

  @media (min-width: 500px) {
    margin: 0;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    width: auto;
    align-items: center;
  }
`;

const activeClassName = "active";

const AnchorTag = styled(NavLink).attrs({ activeClassName })`
  color: #8f5c2c;
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  display: block;

  &:hover {
    color: #40a4c8;
  }

  &.active {
    color: #40a4c8;
  }

  @media (min-width: 500px) {
    color: white;
    height: 100%;
    padding: 16px 10px;
    border-bottom: 4px solid transparent;

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
  } ;
`;

const NavigationItem = (props) => {
  return (
    <ListItem>
      <AnchorTag className={props.className} exact to={props.link}>
        {props.children}
      </AnchorTag>
    </ListItem>
  );
};

export default NavigationItem;
