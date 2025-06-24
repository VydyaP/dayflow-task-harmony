
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Clock } from 'lucide-react';
import { Task } from '@/pages/Planner';
import { TimePickerDialog } from '@/components/TimePickerDialog';
import { useState } from 'react';

interface TaskRowProps {
  task: Task;
  duration: string;
  onUpdate: (id: string, field: keyof Task, value: string) => void;
  onDelete: (id: string) => void;
}

export const TaskRow = ({ task, duration, onUpdate, onDelete }: TaskRowProps) => {
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  return (
    <div className="px-6 py-4 hover:bg-slate-50 transition-colors">
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Start Time */}
        <div className="col-span-3">
          <div className="relative">
            <Input
              type="time"
              value={task.startTime}
              onChange={(e) => onUpdate(task.id, 'startTime', e.target.value)}
              className="rounded-xl shadow-sm border-slate-200 focus:border-blue-400 focus:ring-blue-400"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowStartTimePicker(true)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 h-6 w-6"
            >
              <Clock className="w-3 h-3" />
            </Button>
          </div>
          <TimePickerDialog
            isOpen={showStartTimePicker}
            onClose={() => setShowStartTimePicker(false)}
            value={task.startTime}
            onSelect={(time) => onUpdate(task.id, 'startTime', time)}
          />
        </div>

        {/* End Time */}
        <div className="col-span-3">
          <div className="relative">
            <Input
              type="time"
              value={task.endTime}
              onChange={(e) => onUpdate(task.id, 'endTime', e.target.value)}
              className="rounded-xl shadow-sm border-slate-200 focus:border-blue-400 focus:ring-blue-400"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowEndTimePicker(true)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 h-6 w-6"
            >
              <Clock className="w-3 h-3" />
            </Button>
          </div>
          <TimePickerDialog
            isOpen={showEndTimePicker}
            onClose={() => setShowEndTimePicker(false)}
            value={task.endTime}
            onSelect={(time) => onUpdate(task.id, 'endTime', time)}
          />
        </div>

        {/* Duration */}
        <div className="col-span-2">
          <div className="text-sm font-medium text-slate-700">{duration}</div>
        </div>

        {/* Task Description */}
        <div className="col-span-3">
          <Input
            placeholder="Enter task description..."
            value={task.description}
            onChange={(e) => onUpdate(task.id, 'description', e.target.value)}
            className="rounded-xl shadow-sm border-slate-200 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>

        {/* Actions */}
        <div className="col-span-1">
          <Button
            onClick={() => onDelete(task.id)}
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
