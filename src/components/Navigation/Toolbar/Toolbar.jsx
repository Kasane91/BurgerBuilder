import React from "react";
import styled from "styled-components";

const ToolbarHeader = styled.header`
  height: 56px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #703b09;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 90;
`;

const NewNav = styled.nav`
  height: 100%;
`;

const Toolbar = (props) => {
  return (
    <ToolbarHeader>
      <div>MENU</div>
      <div>LOGO</div>
      <NewNav>...</NewNav>
    </ToolbarHeader>
  );
};

export default Toolbar;
