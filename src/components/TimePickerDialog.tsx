
import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface TimePickerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onSelect: (time: string) => void;
}

export const TimePickerDialog = ({ isOpen, onClose, value, onSelect }: TimePickerDialogProps) => {
  const [hours, setHours] = useState(parseInt(value.split(':')[0]) || 12);
  const [minutes, setMinutes] = useState(parseInt(value.split(':')[1]) || 0);
  const [isPM, setIsPM] = useState(hours >= 12);
  
  const clockRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState<'hours' | 'minutes' | null>(null);

  const handleTimeSelect = () => {
    const hour24 = isPM && hours !== 12 ? hours + 12 : !isPM && hours === 12 ? 0 : hours;
    const timeString = `${hour24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    onSelect(timeString);
    onClose();
  };

  const getAngle = (clientX: number, clientY: number) => {
    if (!clockRef.current) return 0;
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const angle = getAngle(e.clientX, e.clientY);
    const normalizedAngle = ((angle * 180 / Math.PI + 90) % 360 + 360) % 360;
    
    if (isDragging === 'hours') {
      const hour = Math.round(normalizedAngle / 30) % 12;
      setHours(hour === 0 ? 12 : hour);
    } else if (isDragging === 'minutes') {
      const minute = Math.round(normalizedAngle / 6) % 60;
      setMinutes(minute);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const hourAngle = ((hours % 12) * 30 - 90) * Math.PI / 180;
  const minuteAngle = (minutes * 6 - 90) * Math.PI / 180;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle>Select Time</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6">
          {/* Digital Display */}
          <div className="text-4xl font-mono bg-slate-100 px-6 py-3 rounded-2xl">
            {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')} {isPM ? 'PM' : 'AM'}
          </div>

          {/* Analog Clock */}
          <div className="relative">
            <svg
              ref={clockRef}
              width="240"
              height="240"
              viewBox="0 0 240 240"
              className="border-2 border-slate-200 rounded-full bg-white shadow-lg"
            >
              {/* Clock face */}
              <circle cx="120" cy="120" r="110" fill="white" stroke="#e2e8f0" strokeWidth="2" />
              
              {/* Hour markers */}
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i * 30 - 90) * Math.PI / 180;
                const x1 = 120 + 95 * Math.cos(angle);
                const y1 = 120 + 95 * Math.sin(angle);
                const x2 = 120 + 85 * Math.cos(angle);
                const y2 = 120 + 85 * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#64748b"
                    strokeWidth="2"
                  />
                );
              })}

              {/* Hour numbers */}
              {Array.from({ length: 12 }, (_, i) => {
                const hour = i === 0 ? 12 : i;
                const angle = (i * 30 - 90) * Math.PI / 180;
                const x = 120 + 75 * Math.cos(angle);
                const y = 120 + 75 * Math.sin(angle);
                return (
                  <text
                    key={i}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-semibold fill-slate-700"
                  >
                    {hour}
                  </text>
                );
              })}

              {/* Hour hand */}
              <line
                x1="120"
                y1="120"
                x2={120 + 50 * Math.cos(hourAngle)}
                y2={120 + 50 * Math.sin(hourAngle)}
                stroke="#3b82f6"
                strokeWidth="4"
                strokeLinecap="round"
                className="cursor-pointer"
                onMouseDown={() => setIsDragging('hours')}
              />

              {/* Minute hand */}
              <line
                x1="120"
                y1="120"
                x2={120 + 80 * Math.cos(minuteAngle)}
                y2={120 + 80 * Math.sin(minuteAngle)}
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                className="cursor-pointer"
                onMouseDown={() => setIsDragging('minutes')}
              />

              {/* Center dot */}
              <circle cx="120" cy="120" r="6" fill="#1f2937" />
            </svg>
          </div>

          {/* AM/PM Toggle */}
          <div className="flex bg-slate-100 rounded-2xl p-1">
            <Button
              variant={!isPM ? "default" : "ghost"}
              onClick={() => setIsPM(false)}
              className="rounded-xl px-6"
            >
              AM
            </Button>
            <Button
              variant={isPM ? "default" : "ghost"}
              onClick={() => setIsPM(true)}
              className="rounded-xl px-6"
            >
              PM
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-2xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleTimeSelect}
              className="flex-1 rounded-2xl bg-blue-500 hover:bg-blue-600"
            >
              Select
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
