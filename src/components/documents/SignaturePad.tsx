import React, { useRef, useEffect, useState } from 'react';
import { Button } from '../ui/Button';
import { Check, X } from 'lucide-react';

interface SignaturePadProps {
  onSave: (signatureImage: string) => void;
  onClear: () => void;
}

const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, onClear }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#333';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
    setHasContent(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasContent(false);
    onClear();
  };

  const handleSave = () => {
    if (!hasContent) {
      alert("Please provide a signature before saving.");
      return;
    }
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions before saving.");
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;

    const signatureImage = canvas.toDataURL('image/png');
    onSave(signatureImage);
  };

  return (
    <div className="flex flex-col gap-4 p-1">
      <div className='flex flex-col gap-1'>
        <h3 className="text-lg font-medium text-gray-900">Draw your signature</h3>
        <p className="text-sm text-gray-600">
          Use your mouse or trackpad to draw your signature in the box below.
        </p>
      </div>

      <div className="relative w-full h-48 border border-gray-300 rounded-lg shadow-inner bg-gray-50">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-full cursor-crosshair"
        ></canvas>
        {!hasContent && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
            Signature area
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms-checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
        />
        <label htmlFor="terms-checkbox" className="text-sm text-gray-600">
          I agree to the{' '}
          <a href="/terms-of-service" target="_blank" className="text-primary-600 hover:underline">
            Terms and Conditions
          </a>
        </label>
      </div>

      <div className="flex justify-end items-center gap-3">
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={!hasContent}
          leftIcon={<X size={18} />}
        >
          Clear
        </Button>
        <Button
          onClick={handleSave}
          disabled={!hasContent || !agreedToTerms}
          leftIcon={<Check size={18} />}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default SignaturePad;
