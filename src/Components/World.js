import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";

export default function WorldConnections() {
  const globeEl = useRef();
  const [arcs, setArcs] = useState([]);

  useEffect(() => {
    if (!globeEl.current) return;

    const controls = globeEl.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.75;

    setArcs([
      { startLat: 40.7, startLng: -74, endLat: 35.6, endLng: 139.6, color: "#6CA8FF" },
      { startLat: 51.5, startLng: -0.12, endLat: 1.35, endLng: 103.8, color: "#FF6C8F" },
      { startLat: -23.55, startLng: -46.63, endLat: 47.37, endLng: 8.54, color: "#FFD36C" }
    ]);
  }, []);

  return (
    <div style={{ width: "100%", height: "600px", background: "#111" }}>
      <Globe
        ref={globeEl}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"

        arcsData={arcs}
        arcColor={"color"}
        arcAltitude={0.4}
        arcStroke={1.2}

        arcDashLength={0.5}
        arcDashGap={0.2}
        arcDashAnimateTime={3000}
      />
    </div>
  );
}
