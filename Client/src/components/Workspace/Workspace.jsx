import React from "react";
import { useState } from "react";
import Split from "react-split";
import Confetti from "react-confetti";
import useWindowSize from "../../Hooks/UseWindowSize";
import Landing from "../Editor/Landing";
import ProblemDescription from "../ProblemDescription/ProblemDescription";
import Playground from "../Playground/Playground";

const Workspace = (problem) => {
  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);
  const [solved, setSolved] = useState(false);

  return (
    <div className="workspace">
      {width > 768 ? (
        <Split className="split" minSize={0}>
          <ProblemDescription />
          <div className="bg-dark-fill-2">
            <Playground setSuccess={setSuccess} setSolved={setSolved} />
            {success && (
              <Confetti
                gravity={0.3}
                tweenDuration={4000}
                width={width - 1}
                height={height - 1}
              />
            )}
          </div>
        </Split>
      ) : (
        <div className="column-layout">
          <ProblemDescription />
          <Playground setSuccess={setSuccess} setSolved={setSolved} />
          {success && (
            <Confetti
              gravity={0.3}
              tweenDuration={4000}
              width={width - 1}
              height={height - 1}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Workspace;
