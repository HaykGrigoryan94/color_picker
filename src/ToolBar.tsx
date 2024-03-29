import React from 'react';
import image from './assets/IconColorPicker.svg';
import './ToolBar.css';

interface ToolBarProps {
  color: string;
}

const ToolBar: React.FC<ToolBarProps> = ({ color }) => (
  <div className="ToolBarContainer">
    <span>
      <img src={image} alt="colorPickerIcon" />
    </span>
    <span>
      <p className="textColor">
        {color}
      </p>
    </span>
  </div>
);

export default ToolBar;
