import React, { useState, useRef, useEffect } from 'react';
import ColorPreview from './ColorPreview';
import './MainCanvas.css';

interface MainCanvasProps {
  image: string;
  getColor: (color: string) => void
}

const MainCanvas: React.FC<MainCanvasProps> = ({ image, getColor }) => {
  const [pickedColor, setPickedColor] = useState<string>('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (!ctx) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setMousePosition({ x, y });
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const imageObj = new Image();
    imageObj.onload = () => {
      canvas.width = imageObj.width;
      canvas.height = imageObj.height;
      ctx.drawImage(imageObj, 0, 0);
    };
    imageObj.src = image;
  }, [image]);

  const rgbToHex = (r: number, g: number, b: number): string => `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;

  const handlePickColor = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const { x } = mousePosition;
    const { y } = mousePosition;
    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    const colorHex = rgbToHex(pixelData[0], pixelData[1], pixelData[2]);
    getColor(colorHex);
    setPickedColor(colorHex);
  };

  return (
    <div className="container">
      <ColorPreview
        mousePosition={mousePosition}
        pickedColor={pickedColor}
        parent={canvasRef.current}
      />
      <canvas
        ref={canvasRef}
        id="canvas"
        onMouseMove={handlePickColor}
      />
    </div>
  );
};

export default MainCanvas;
