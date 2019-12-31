import { useLayoutEffect, useState } from 'react';

export default callback => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      if (callback) {
        callback({ width: window.innerWidth })
      }
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [callback]);
  
  return { width, height };
}