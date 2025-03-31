import "./spriteControl.css";

import React from "react";

import { bg1, bg2, catSprite, girl, penguin } from "~/images";

function SpriteControl(props) {
  const { setImgPath, setBgPath } = props;

  const handleSpriteClick = (path) => {
    setImgPath(path);
  };

  const handleBgClick = (path) => {
    setBgPath(path);
  };

  return (
    <div className="sprite_control">
      <div className="sprite_selection">
        <h3>Choose an sprite</h3>
        <div className="sprite_selection_container">
          <div
            className="image_container"
            onClick={() => handleSpriteClick(catSprite)}
          >
            <img src={catSprite} alt="cat sprite" />
          </div>
          <div
            className="image_container"
            onClick={() => handleSpriteClick(girl)}
          >
            <img src={girl} alt="girl sprite" />
          </div>
          <div
            className="image_container"
            onClick={() => handleSpriteClick(penguin)}
          >
            <img src={penguin} alt="penguin sprite" />
          </div>
        </div>
      </div>
      <div className="background_selection">
        <h3>Choose an background</h3>
        <div className="background_selection_container">
          <div className="image_container" onClick={() => handleBgClick(bg1)}>
            <img src={bg1} alt="bg1" />
          </div>
          <div className="image_container" onClick={() => handleBgClick(bg2)}>
            <img src={bg2} alt="bg2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpriteControl;
