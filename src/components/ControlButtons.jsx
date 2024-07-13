import React from "react";

const ControlButtons = ({
  running,
  setRunning,
  elapsedTime,
  setElapsedTime,
  setStoppedTime,
  setShowStopTime,
  startTimeRef,
}) => {
  const formatTime = (time) => {
    let hours = Math.floor(time / (1000 * 60 * 60));
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let seconds = Math.floor((time / 1000) % 60);
    let milliseconds = Math.floor((time % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours} : ${minutes} : ${seconds} : ${milliseconds}`;
  };

  const pauseHandler = () => {
    setRunning(false);
  };

  const stopHandler = () => {
    pauseHandler();
    setStoppedTime(formatTime(elapsedTime));
    setShowStopTime(true);
    setElapsedTime(0);
    setRunning(false);
  };

  const startHandler = () => {
    setShowStopTime(false);
    setRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  };

  const resetHandler = () => {
    setShowStopTime(false);
    setElapsedTime(0);
    setRunning(false);
  };

  return (
    <div className="justify-between flex [&>button]:px-5 [&>button]:py-1 [&>button]:rounded-md mt-5 sm:flex-col sm:[&>button]:my-2">
      <button className="bg-red-500 hover:opacity-80" onClick={stopHandler}>
        Stop
      </button>

      {running ? (
        <button
          className="bg-yellow-300 hover:opacity-80 min-w-20"
          onClick={pauseHandler}
        >
          Pause
        </button>
      ) : (
        <button
          className="bg-green-300 hover:opacity-80 min-w-20"
          onClick={startHandler}
        >
          Start
        </button>
      )}

      <button className="bg-slate-400 hover:opacity-80" onClick={resetHandler}>
        Reset
      </button>
    </div>
  );
};

export default ControlButtons;
