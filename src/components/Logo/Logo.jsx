import React from "react";
import burgerLogo from "../resources/burger-logo.png";
import styled from "styled-components";

const ImgDiv = styled.div`
  background-color: white;
  padding: 8px;
  height: 80%;
  box-sizing: border-box;
  border-radius: 5px;
`;

const StyledImg = styled.img`
  height: 100%;
`;

const Logo = (props) => {
  return (
    <ImgDiv>
      <StyledImg src={burgerLogo} alt="burger_logo_png" />
    </ImgDiv>
  );
};

export default Logo;
