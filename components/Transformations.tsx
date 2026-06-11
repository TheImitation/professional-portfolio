import React from "react";
import "../styles/components/Transformations.css";

const RotatingCube: React.FC = () => {

  return (
    <div className="cube">
      <div className="face1">1</div>
      <div className="face2">2</div>
      <div className="face3">3</div>
      <div className="face4">4</div>
      <div className="face5">5</div>
      <div className="face6">6</div>
    </div>
  );
};

export default RotatingCube;
