import React, { useEffect, useRef } from 'react';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import '../Custom/MovingButton.css'; // Import CSS file for styles

const MovingButton = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    const animationDuration = 5000;
    const interval = 100;

    let position = 0;
    let intervalId;

    const moveButton = () => {
      position += 1;
      if (position <= 100) {
        button.style.left = `${position}%`;
      } else {
        position = 0;
        button.style.left = '0%';
      }
    };

    intervalId = setInterval(moveButton, interval);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="moving-button-container">
      <button ref={buttonRef} className="moving-button">
        <QueuePlayNextIcon /> Let's Get Course Here !
      </button>
    </div>
  );
};

export default MovingButton;
