import React, { useEffect, useRef, useState } from "react";
import ControlButtons from "./ControlButtons";

const StopWatch = () => {
  const [running, setRunning] = useState(false);
  const [stoppedTime, setStoppedTime] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showStopTime, setShowStopTime] = useState(false);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const formatTime = (time) => {
    let hours = Math.floor(time / (1000 * 60 * 60));
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let seconds = Math.floor((time / 1000) % 60);
    let milliseconds = Math.floor((time % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours} : ${minutes} : ${seconds} : ${""} ${milliseconds}`;
  };

  return (
    <div className="p-5 ">
      <div className="mb-10 sm:mb-5">
        <div className="text-center flex flex-col">
          <div className="my-5">
            <h1 className="text-3xl font-bold underline">Stop Watch</h1>
          </div>
          <div className="mt-5 ">
            {showStopTime ? (
              <h1 className="text-3xl font-bold sm:text-xl">{stoppedTime}</h1>
            ) : (
              <h1 className="text-3xl font-bold font-mono sm:text-xl ">
                {formatTime(elapsedTime)}
              </h1>
            )}
          </div>
        </div>
      </div>
      <ControlButtons
        running={running}
        setRunning={setRunning}
        elapsedTime={elapsedTime}
        setElapsedTime={setElapsedTime}
        stoppedTime={stoppedTime}
        setStoppedTime={setStoppedTime}
        showStopTime={showStopTime}
        setShowStopTime={setShowStopTime}
        startTimeRef={startTimeRef}
      />
    </div>
  );
};

export default StopWatch;
