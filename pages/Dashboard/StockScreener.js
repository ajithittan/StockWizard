import React, { useState } from "react";
import { render } from "react-dom";
import { Rnd } from "react-rnd";

const StockScreener = (props) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    background: "#f0f0f0"
  };

  const [RND, SetRND] = useState({ width: 200, height: 200, x: 10, y: 10 });

  const changePosition = (e, d) => {
    SetRND({ x: d.x, y: d.y });
  };

  const changeSize = (e, direction, ref, delta, position) => {
    SetRND({
      width: ref.style.width,
      height: ref.style.height,
      ...position
    });
  };

  return (
    <Rnd
      style={style}
      size={{ width: RND.width, height: RND.height }}
      position={{ x: RND.x, y: RND.y }}
      onDragStop={changePosition}
      onResizeStop={changeSize}
    ></Rnd>
  );
}

export default StockScreener
