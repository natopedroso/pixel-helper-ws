import React, { useEffect, useState } from "react";
import LoadingSpin from "react-loading-spin";

export default function Loading({ show }) {
  /**
   * VARS
   */
  const [showDelayed, setShowDelayed] = useState(true);
  const [opacity, setOpacity] = useState(1);

  /**
   * METHODS
   */
  function oTo(val, current) {
    val = parseFloat(val);
    current = parseFloat(current);
    // console.log(val, current);
    if (val < current) current = (parseFloat(current) - 0.1).toFixed(2);
    if (val > current) current = (parseFloat(current) + 0.2).toFixed(2);
    setOpacity(current);
    if (parseFloat(val) === parseFloat(current)) {
      // console.log("termino", val, current);
      setShowDelayed(val ? true : false);
      return;
    }
    setTimeout(() => {
      oTo(val, current);
    }, 25);
  }

  /**
   * EFFECTS
   */
  useEffect(() => {
    setShowDelayed(show);
  }, []);
  useEffect(() => {
    if (show) {
      setOpacity(1);
      setShowDelayed(show);
    } else {
      oTo(0, opacity);
    }
  }, [show]);

  /**
   * RENDER
   */
  return (
    <div
      hidden={!showDelayed}
      style={{
        position: "fixed",
        zIndex: 2000,
      }}
      className="loading"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          opacity: opacity,
          gap: 10,
          //backgroundColor: "#00000088",
          backdropFilter: "blur(5px)",
          pointerEvents: "none",
        }}
      >
        <LoadingSpin primaryColor="var(--secondary)" secondaryColor="var(--secondaryDark)" numberOfRotationsInAnimation={2} size={"100px"} width={"10"}></LoadingSpin>
        CARREGANDO...
      </div>
    </div>
  );
}
