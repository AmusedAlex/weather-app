import React from "react";
import Display from "./Display";

import Front from "./Front";

export default function Home() {
  return (
    <>
      <Display city={"tokyo"} />
      <Front />
      <Display city={"almaty"} />
    </>
  );
}
