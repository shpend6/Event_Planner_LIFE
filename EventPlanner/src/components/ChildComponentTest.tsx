import ig from "../assets/ig.png";
// import { useState } from "react";

interface ChildProps {
  logo: string;
}

function ChildComponent(props: ChildProps) {
  const { logo } = props;
  return <img src={logo} alt=" " />;
}

export default ChildComponent;
