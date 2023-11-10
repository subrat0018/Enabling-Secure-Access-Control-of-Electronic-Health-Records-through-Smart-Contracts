// Box.jsx
import React from 'react';
import { useSpring, animated } from 'react-spring';

const Box = ({ text, color }) => {
  const props = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.8)' },
    config: { duration: 500 },
  });

  const boxStyles = {
    width: '150px', // Adjust the width as needed
    height: '150px', // Square boxes
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    margin: '10px',
    cursor: 'pointer',
    borderRadius: '8px',
    backgroundImage: `linear-gradient(135deg, ${color} 0%, ${color.replace(
      '400',
      '600'
    )} 100%)`,
    color: '#fff',
    transition: 'transform 0.3s ease-in-out',
  };

  return (
    <animated.div
      style={{ ...props, ...boxStyles }}
      className="hover:scale-110 transition-transform duration-300 ease-in-out"
    >
      {text}
    </animated.div>
  );
};

export default Box;
