import { useState, useEffect } from 'react';

import '../styles/components/WatchLoader.scss';

const WatchLoader = () => {
  const [rotation, setRotation] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prevRotation) => prevRotation + 5);
    }, 100); // Adjust interval for animation speed

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="block-container">
      <div className="watch-container">
        <div className="watch-face">
          <div
            className="watch-hand"
            style={{ transform: `rotate(${rotation}deg)` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WatchLoader;