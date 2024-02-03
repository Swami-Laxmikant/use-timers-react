/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import './App.css';
import {type SetTimeout, UseTimeout, useTimeout} from 'use-timers-react';

function App() {

  const [timers, setTimers] = useState<number[]>([]);
  let [count, setCount] = useState(0);
  let timeoutObj = useTimeout();

  return (
    <div className="App">
      <h1 style={{marginBottom: 0, fontSize: 20}}>{count}</h1>
      <div style={{justifyContent: 'center'}} className='btnCont'>
      <button onClick={()=>setTimers(pre => {
        return [...pre, pre.length + 1]
      })}>Add Timer</button>
      <button onClick={timeoutObj.clearAllTimeouts}>Clear All</button>
      </div>
      <div className='timersCont'>
        {timers.map(t => <Timer id={t.toString()} inc={() => setCount(pre => pre + 1)} timeoutObj={timeoutObj} key={t}/>)}
      </div>
    </div>
  );
}

export default App;

export const Timer = ({inc, timeoutObj: {setTimeout, clearTimeout}, id}: {inc: () => void; timeoutObj: UseTimeout, id: string}) => {

  const timerRef = useRef<SetTimeout>();
  const [logs, setLogs] = useState<{action: string, time: number, diff: number}[]>([])
  const setLog = (log: string) => setLogs(pre => {
    let lastItem = pre[pre.length - 1];
    let time = Date.now();
    let diff = lastItem ? time - lastItem.time : 0;
    return [...pre, {action: log, time, diff}]
  })

  useEffect(()=>{
    setLog('started');
    timerRef.current = setTimeout(() => {
      inc();
      setLog('finished');
    }, 5000, {
      onClear: () => setLog('cleared'),
      onReset: () => setLog('reset'),
      key: id,
    });
  }, [setInterval])

  return <div className='timerCont'>
    <p>key: <i><b>{id}</b></i></p>
    <div className='btnCont'>
    <button onClick={()=>timerRef.current?.reset()}>reset</button>
    <button onClick={()=>timerRef.current?.clear()}>clear using <span>.clear()</span></button>
    </div>
    <button onClick={()=>clearTimeout(timerRef.current!)}>clear using <span>clearTimeout(id)</span></button>
    <button onClick={()=>clearTimeout(id)}>clear using <span>clearTimeout(key)</span></button>
    
    {
      logs.map((l, i) => <div key={i}>{l.action} : {(l.diff/1000).toFixed(1)}</div>)
    }
  </div>
}
