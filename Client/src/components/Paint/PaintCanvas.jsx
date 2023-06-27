import React, { useState, useEffect } from "react";
import { CanvasSketchTool } from "react-arts";

function Paint() {
    const eraserOptions = {
      strokeWidth: 50, // Adjust the stroke width as desired
    };
     const colorPalette = [
       "#000000",
       "#ff0000",
       "#00ff00",
       "#0000ff",
       "#ffff00",
     ];
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      key={windowWidth}
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url('Images/herobg.png')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="w-3/4 sm:w-full">
        <CanvasSketchTool
          height={450}
          width={750}
          tool="flood-fill"
          colorPalette={colorPalette}
        />
      </div>
    </div>
  );
}

export default Paint;
