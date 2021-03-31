import React, { Fragment, useState } from "react";
import styled from "styled-components";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../components/Navigation/Sidedrawer/Sidedrawer";

const StyledMain = styled.main`
  margin-top: 72px;
`;

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const toggleSideDrawerHandler = () => {
    setShowSideDrawer((prevState) => {
      return !prevState;
    });
  };

  return (
    <Fragment>
      <Toolbar clicked={toggleSideDrawerHandler} />
      <SideDrawer
        showBackdrop={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <StyledMain>{props.children}</StyledMain>
    </Fragment>
  );
};

export default Layout;
