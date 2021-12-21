import React from "react";
import ReactLoading from "react-loading";

const Loader = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={"20%"} width={"20%"} />
);

Loader.defaultProps = {
  type: "spinningBubbles",
  color: "black",
};
export default Loader;
