import React, { Fragment, useState } from "react";
import styled from "styled-components";
import Toolbar from "../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../components/Navigation/Sidedrawer/Sidedrawer";
import { connect } from "react-redux";

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
      <Toolbar
        isAuthenticated={props.isAuthenticated}
        clicked={toggleSideDrawerHandler}
      />
      <SideDrawer
        isAuthenticated={props.isAuthenticated}
        showBackdrop={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <StyledMain>{props.children}</StyledMain>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
