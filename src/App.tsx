import React, { useContext } from "react";
import { useTimer } from "react-timer-hook";

import { SwitchProvider, SwitchContext } from "./SwitchProvider";

function MyTimer({ expiryTimestamp }: { expiryTimestamp: number }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called")
  });

  // タイマーがアクティブな常態かどうかの判定を行う
  const { switchInfo, setSwitchInfo } = useContext(SwitchContext);
  console.log(switchInfo);

  const onClickPause = () => {
    setSwitchInfo({ isActive: !switchInfo.isActive });
    pause();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>react-timer-hook </h1>
      <p>Timer Demo</p>
      <div style={{ fontSize: "100px" }}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <button onClick={start}>Start</button>
      <button onClick={onClickPause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 25);
          restart((time as unknown) as number);
        }}
      >
        Restart
      </button>
    </div>
  );
}

export default function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 1500); // 10 minutes timer

  return (
    <SwitchProvider>
      <div>
        <MyTimer expiryTimestamp={(time as unknown) as number} />
        <MyTimer expiryTimestamp={(time as unknown) as number} />
      </div>
    </SwitchProvider>
  );
}
