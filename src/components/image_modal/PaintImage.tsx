import { PaintableImageProps } from '@/types/components/images/interfaces';
import { useRef, useEffect, useState } from 'react';


const PaintableImage: React.FC<PaintableImageProps> = ({ src,  color, onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const image = new Image();
    image.src = src;

    image.onload = () => {
      if (context && canvas) {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
      }
    };
  }, [src]);

  const startPaint = (event: React.MouseEvent) => {
    const coordinates = getMousePosition(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  };

  const paint = (event: React.MouseEvent) => {
    if (isPainting) {
      const newMousePosition = getMousePosition(event);
      if (mousePosition && newMousePosition) {
        drawLine(mousePosition, newMousePosition);
        setMousePosition(newMousePosition);
      }
    }
  };

  const exitPaint = () => {
    setIsPainting(false);
    setMousePosition(undefined);
  };

  const getMousePosition = (event: React.MouseEvent): { x: number; y: number } | undefined => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    return {
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    };
  };

  const drawLine = (originalMousePosition: { x: number; y: number }, newMousePosition: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (context) {
      context.strokeStyle = color;
      context.lineJoin = 'round';
      context.lineWidth = 5;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  useEffect(() => {
    const handleSave = () => {
      if (canvasRef.current) {
        onSave(canvasRef.current.toDataURL());
      }
    };

    window.addEventListener('beforeunload', handleSave);
    return () => {
      window.removeEventListener('beforeunload', handleSave);
    };
  }, [onSave]);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startPaint}
      onMouseMove={paint}
      onMouseUp={exitPaint}
      onMouseLeave={exitPaint}
      style={{ cursor: 'crosshair', border: '1px solid black' }}
    />
  );
};

export default PaintableImage;