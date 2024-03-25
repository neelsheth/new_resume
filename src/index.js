import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ChatBotResume from './component/ChatBotResume';
import Snowfall from 'react-snowfall';

// const flakeColors = ['gold', 'red','aqua','white','RGB(249 153 238)','RGB(175 255 179)'];

const App = () => {
  const [colorIndex, setColorIndex] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setColorIndex((prevIndex) => (prevIndex + 1) % flakeColors.length);
  //   }, 10000); // Change color every 2 seconds

  //   return () => clearInterval(timer);
  // }, []);

  return (
    <div>
      {/* <Snowfall color={flakeColors[colorIndex]} radius={[1.0, 5.0]} /> */}
      <ChatBotResume />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);