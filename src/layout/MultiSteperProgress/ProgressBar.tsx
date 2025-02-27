import React, { useEffect, useState } from "react";
// import "./MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Box } from "@mui/material";
import CircularDeterminate from "../circularprogress";
import StepperButtons from "./stepperButtons";
import { themColor } from "@/src/theme/themColor";
// import { themColor } from "@/src/theme/themeColor";
const steps = [
  "1: Select Channel",
  "2: Widget Customization",
  "3: Triggers and Targeting",
];

const NewProgressBar = ({
  page,
  onPageNumberClick,
  state,
  setState,
}: {
  page: string;
  state: any;
  setState: any;
  onPageNumberClick: (pageNumber: number) => void;
}) => {
  var stepPercentage = 0;
  if (page === "pageone") {
    stepPercentage = 25;
  } else if (page === "pagetwo") {
    stepPercentage = 74.5;
  } else if (page === "pagethree") {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }
  const [isMobile, setIsMobile] = useState(window.innerWidth < 910);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 910);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <CircularDeterminate page={page} />
      ) : (
        <ProgressBar percent={stepPercentage}>
          <Step>
            {({ accomplished, index }) => (
              <Box
                onClick={() => onPageNumberClick(1)}
                sx={{
                  padding: "3px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "170px",

                  "&:hover": {
                    borderRadius: "8px",
                    background: themColor.hoverColor,
                  },
                }}
              >
                <div
                  onClick={() => onPageNumberClick(1)}
                  className={`indexedStep ${
                    accomplished ? "accomplished" : null
                  }`}
                >
                  {/* {index + 1} */}
                </div>
                <div
                  //  className="text-[0.7rem]"
                  className={`text-[0.7rem] mt-1 text-secondary  ${
                    accomplished ? "accomplished " : ""
                  }`}
                >
                  1: Select channels
                </div>
              </Box>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <Box
                onClick={() => onPageNumberClick(2)}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  padding: "3px",
                  alignItems: "center",

                  width: "170px",
                  "&:hover": {
                    borderRadius: "8px",
                    background: themColor.hoverColor,
                  },
                }}
              >
                {/* Icon or step indicator */}
                <div
                  className={`indexedStep ${
                    accomplished ? "accomplished" : ""
                  }`}
                >
                  {/* Step icon can go here */}
                </div>
                <div
                  className={`text-[0.7rem] mt-1 text-secondary ${
                    accomplished ? "accomplished" : ""
                  }`}
                >
                  2: Widget Customization
                </div>
              </Box>
            )}
          </Step>
          <Step>
            {({ accomplished, index }) => (
              <Box
                onClick={() => onPageNumberClick(3)}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  padding: "3px",
                  alignItems: "center",

                  width: "170px",
                  "&:hover": {
                    borderRadius: "8px",
                    background: themColor.hoverColor,
                  },
                }}
              >
                <div
                  className={`indexedStep ${
                    accomplished ? "accomplished" : null
                  }`}
                >
                  {/* {index + 1} */}
                </div>
                <div
                  className={`text-[0.7rem] mt-1 text-secondary ${
                    accomplished ? "accomplished " : ""
                  }`}
                >
                  3: Triggers and Targeting
                </div>
              </Box>
            )}
          </Step>
        </ProgressBar>
      )}

      <Box
        sx={{
          justifyContent: "flex-end",
          width: "100%",
          display: "flex",
          position: "absolute",
          top: isMobile ? "-78px" : "-79px",
          zIndex: 2000,
        }}
      >
        <StepperButtons
          page={page}
          steps={steps}
          state={state}
          setState={setState}
          onPageNumberClick={onPageNumberClick}
        />
      </Box>
    </>
  );
};

export default NewProgressBar;
