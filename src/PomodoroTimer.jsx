import React, { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        if (min === 0 && sec === 0) {
          clearInterval(intervalId);
          setIsActive(false);
          setTimeout(() => {
            setMin(5);
            setSec(0);
            setIsActive(true);
          }, 5000);
        } else {
          if (sec === 0) {
            setMin((prevMin) => prevMin - 1);
            setSec(59);
          } else {
            setSec((prevSec) => prevSec - 1);
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, min, sec]);

  const start = () => {
    setIsActive(true);
  };

  const pause = () => {
    setIsActive(false);
  };

  const reset = () => {
    setIsActive(false);
    setMin(25);
    setSec(0);
  };

  const formattedMin = min < 10 ? `0${min}` : `${min}`;
  const formattedSec = sec < 10 ? `0${sec}` : `${sec}`;

  return (
    <div>
      <h1 className="main-z">Pomodoro - Timer</h1>
      <div id="timer">{`${formattedMin}:${formattedSec}`}</div>
      <div id="control">
        <button className="start" onClick={start}>
          START
        </button>
        <div>
          <button onClick={pause}>PAUSE</button>
          <button onClick={reset}>RESET</button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
