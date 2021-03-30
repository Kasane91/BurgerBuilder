import React from "react";

const ToggleButton = (props) => {
  return (
    <div onClick={props.clicked} className="DrawerToggle">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default ToggleButton;
