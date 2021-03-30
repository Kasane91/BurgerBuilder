import React from "react";
import burgerLogo from "../resources/burger-logo.png";
import styled from "styled-components";

const ImgDiv = styled.div`
  background-color: white;
  padding: 8px;
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;

  &.Toolbar {
    height: 80%;
  }

  &.SideDrawer {
    height: 11%;
    margin-bottom: 32px;
  }
`;

const StyledImg = styled.img`
  height: 100%;
`;

const Logo = (props) => {
  return (
    <ImgDiv className={props.className}>
      <StyledImg src={burgerLogo} alt="burger_logo_png" />
    </ImgDiv>
  );
};

export default Logo;
