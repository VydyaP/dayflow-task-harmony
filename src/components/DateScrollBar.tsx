
import { format, addDays, subDays, isSameDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRef } from 'react';

interface DateScrollBarProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
}

export const DateScrollBar = ({ currentDate, onDateSelect }: DateScrollBarProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Generate 15 days around current date
  const dates = Array.from({ length: 15 }, (_, i) => {
    return addDays(currentDate, i - 7);
  });

  return (
    <div className="mb-6">
      <ScrollArea className="w-full whitespace-nowrap rounded-2xl">
        <div className="flex space-x-2 p-2">
          {dates.map((date) => {
            const isSelected = isSameDay(date, currentDate);
            const isToday = isSameDay(date, new Date());
            
            return (
              <Button
                key={date.toISOString()}
                onClick={() => onDateSelect(date)}
                variant={isSelected ? "default" : "ghost"}
                className={`
                  flex-shrink-0 flex flex-col items-center px-4 py-3 rounded-2xl min-w-[80px] transition-all duration-200
                  ${isSelected 
                    ? 'bg-blue-500 text-white shadow-lg scale-105' 
                    : 'hover:bg-slate-100 text-slate-700'
                  }
                  ${isToday && !isSelected ? 'bg-orange-100 text-orange-700 font-semibold' : ''}
                `}
              >
                <span className="text-xs font-medium">
                  {format(date, 'EEE')}
                </span>
                <span className={`text-lg font-bold ${isSelected ? 'text-white' : ''}`}>
                  {format(date, 'd')}
                </span>
                <span className="text-xs opacity-75">
                  {format(date, 'MMM')}
                </span>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
