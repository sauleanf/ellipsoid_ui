/* eslint-disable */
import React from "react";
import {Icon} from "./index";
import "./style/fab.css"

const FAB = (props) => {
  const { onClick, text, icon } = props;
  return (<div className="fab-container">
    <button
      type="button"
      className="fab-btn"
      onClick={() => onClick()}
    >
      <Icon icon={icon} theme="dark" />
      <h3 className="fab-text"> {text} </h3>
    </button>
  </div>)
}

export default FAB;

