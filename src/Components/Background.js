// https://www.vantajs.com/?effect=cells#(amplitudeFactor:1,backgroundAlpha:1,backgroundColor:14155663,color1:1579032,color2:9676473,gyroControls:!f,minHeight:200,minWidth:200,mouseControls:!t,ringFactor:1,rotationFactor:1,scale:1,scaleMobile:3,size:1.5,speed:1,touchControls:!t)
import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import CELLS from "vanta/dist/vanta.cells.min";

const Background = () => {
  const [vantaEffect, setVantaEffect] = React.useState(null);
  const vantaRef = React.useRef(null);

  React.useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(CELLS({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 0.5,
        size: 1,
        color1: 0x181818,
        color2: 0x727a87,
      }));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    />
  );
};

export default Background;