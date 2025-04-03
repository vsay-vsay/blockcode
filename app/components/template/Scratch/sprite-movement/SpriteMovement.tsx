import "./spriteMovement.css";

import React from "react";

import { bg1, bg2, catSprite, girl, penguin } from "~/images";

function SpriteMovement(props) {
  const { onRunClicked, msg, reset, bgPath, imgPath } = props;

  const styles = {
    backgroundImage: `url(${bgPath})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    display: "flex",
  };

  return (
    <div className="sprite_movement" style={bgPath === "none" ? null : styles}>
      <div className="buttons">
        <button className="run" onClick={onRunClicked}>
          Run
        </button>
        <button className="reset" onClick={reset}>
          Reset
        </button>
      </div>
      <div className="sprite_container" id="sprite1">
        <div className="msg">{msg}</div>
        <div className="think"></div>
        <img src={imgPath} alt="sprite" />
      </div>
    </div>
  );
}

export default SpriteMovement;
