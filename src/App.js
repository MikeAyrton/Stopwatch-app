import React, { useState } from 'react';
import './App.css';
import BtnDisplayComponent from './components/BtnDisplayComponent';
import DisplayComponent from './components/DisplayComponent';

function App() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  let updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  }

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  }

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  }

  const resume = () => start();

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  }

  return (
    <div className="main-section">
      <div className='clock-holder'>
        <div className='stopwatch'>
          <DisplayComponent time={time} />
          <BtnDisplayComponent
            start={start}
            status={status}
            stop={stop}
            reset={reset}
            resume={resume}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
