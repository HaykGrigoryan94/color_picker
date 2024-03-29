import React, { useState } from 'react';
import image from './assets/palm.jpg';
import MainCanvas from './MainCanvas';
import ToolBar from './ToolBar';

const App: React.FC = () => {
  const [color, setColor] = useState<string>('');
  return (
    <>
      <ToolBar color={color} />
      <MainCanvas image={image} getColor={(eventColor) => setColor(eventColor)} />
    </>
  );
};

export default App;
