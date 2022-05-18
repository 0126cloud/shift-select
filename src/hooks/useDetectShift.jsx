import { useState, useEffect } from 'react'

const useDetectShift = (onShiftUp = () => { }) => {
  const [shifted, setShifted] = useState(false);

  useEffect(() => {
    const func = e => {
      setShifted(e.shiftKey);
      if (!e.shiftKey)
        onShiftUp();
    };
    document.addEventListener('keyup', func);
    document.addEventListener('keydown', func);

    return () => {
      document.removeEventListener('keyup', func);
      document.removeEventListener('keydown', func);
    };
  }, []);
  return shifted;
};

export default useDetectShift
