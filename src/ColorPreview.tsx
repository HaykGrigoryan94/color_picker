import React, { useEffect, useRef } from 'react';

interface ColorPreviewProps {
  mousePosition: { x: number; y: number };
  pickedColor: string;
  parent: HTMLCanvasElement | null
}

const ColorPreview: React.FC<ColorPreviewProps> = ({
  mousePosition, pickedColor, parent,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !parent) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      parent,
      Math.min(Math.max(0, mousePosition.x - 10), parent.width - 10),
      Math.min(Math.max(0, mousePosition.y - 10), parent.height - 10),
      15,
      15,
      0,
      0,
      200,
      200,
    );
    ctx.font = '12px Arial';
    ctx.fillText(pickedColor, 50, 50);
  }, [mousePosition, parent, pickedColor]);

  const style: React.CSSProperties = {
    position: 'absolute',
    left: mousePosition.x - 50,
    top: mousePosition.y - 50,
    pointerEvents: 'none',
    borderRadius: '50%',
    border: `3px solid ${pickedColor}`,
  };

  return <canvas ref={canvasRef} width={100} height={100} style={style} />;
};

export default ColorPreview;
