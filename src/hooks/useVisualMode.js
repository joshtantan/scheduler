import {useState} from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);
  
  const transition = (newMode, replace = false) => {
    setMode(newMode);

    if (replace) {
      setHistory(prev => {
        prev.pop();
        prev.push(newMode);
        return prev;
      });
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  };
  
  const back = () => {
    const historyLength = history.length;
    if (historyLength > 1) {
      const lastMode = history[historyLength - 2];
      setMode(lastMode);
      setHistory(prev => {
        prev.pop();
        return prev;
      });
    }
  };

  return { mode, transition, back };
};
