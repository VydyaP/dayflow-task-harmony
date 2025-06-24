
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trash2, Clock } from 'lucide-react';
import { Task } from '@/pages/Planner';
import { TimePickerDialog } from '@/components/TimePickerDialog';
import { useState } from 'react';

interface TaskRowProps {
  task: Task;
  onUpdate: (id: string, field: keyof Task, value: string) => void;
  onDelete: (id: string) => void;
  categoryColors: Record<string, string>;
}

export const TaskRow = ({ task, onUpdate, onDelete, categoryColors }: TaskRowProps) => {
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  return (
    <div className={`px-6 py-4 hover:bg-slate-50 transition-colors border-l-4 ${categoryColors[task.category]?.replace('bg-', 'border-').replace('-100', '-300') || 'border-gray-300'}`}>
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Start Time */}
        <div className="col-span-2">
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
        <div className="col-span-2">
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

        {/* Task Description */}
        <div className="col-span-4">
          <Input
            placeholder="Enter task description..."
            value={task.description}
            onChange={(e) => onUpdate(task.id, 'description', e.target.value)}
            className="rounded-xl shadow-sm border-slate-200 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>

        {/* Category */}
        <div className="col-span-2">
          <Select
            value={task.category}
            onValueChange={(value) => onUpdate(task.id, 'category', value)}
          >
            <SelectTrigger className="rounded-xl shadow-sm border-slate-200 focus:border-blue-400 focus:ring-blue-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="work">🏢 Work</SelectItem>
              <SelectItem value="personal">🏠 Personal</SelectItem>
              <SelectItem value="study">📚 Study</SelectItem>
              <SelectItem value="break">☕ Break</SelectItem>
              <SelectItem value="meeting">🤝 Meeting</SelectItem>
              <SelectItem value="exercise">💪 Exercise</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="col-span-2">
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
