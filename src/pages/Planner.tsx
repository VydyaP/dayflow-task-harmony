import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, addDays, subDays, parseISO } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { TaskRow } from '@/components/TaskRow';
import { DateScrollBar } from '@/components/DateScrollBar';
import { ExportButton } from '@/components/ExportButton';

export interface Task {
  id: string;
  startTime: string;
  endTime: string;
  description: string;
}

const Planner = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(
    date ? parseISO(date) : new Date()
  );

  useEffect(() => {
    if (date) {
      try {
        setCurrentDate(parseISO(date));
      } catch (error) {
        console.error('Invalid date format:', date);
        setCurrentDate(new Date());
      }
    }
  }, [date]);

  const calculateDuration = (startTime: string, endTime: string): string => {
    if (!startTime || !endTime) return '0h 0m';
    
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    let diffMinutes = endMinutes - startMinutes;
    if (diffMinutes < 0) diffMinutes += 24 * 60; // Handle overnight tasks
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };

  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      startTime: '09:00',
      endTime: '10:00',
      description: '',
    };
    setTasks([...tasks, newTask]);
    console.log('Task added:', newTask);
  };

  const updateTask = (id: string, field: keyof Task, value: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, [field]: value } : task
    ));
    console.log('Task updated:', id, field, value);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    console.log('Task deleted:', id);
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' 
      ? subDays(currentDate, 1) 
      : addDays(currentDate, 1);
    const dateStr = format(newDate, 'yyyy-MM-dd');
    navigate(`/planner/${dateStr}`);
  };

  const handleDateSelect = (selectedDate: Date) => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    navigate(`/planner/${dateStr}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-slate-600 hover:text-slate-800 p-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Calendar
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigateDate('prev')}
              variant="outline"
              size="sm"
              className="p-2 rounded-xl"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <h1 className="text-2xl font-bold text-slate-800 mx-4">
              {format(currentDate, 'EEEE, MMMM d')}
            </h1>
            
            <Button
              onClick={() => navigateDate('next')}
              variant="outline"
              size="sm"
              className="p-2 rounded-xl"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <ExportButton tasks={tasks} date={currentDate} />
        </div>

        {/* Date Scroll Bar */}
        <DateScrollBar 
          currentDate={currentDate} 
          onDateSelect={handleDateSelect}
        />

        {/* Task Table - 4 Columns without Progress */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
            <div className="grid grid-cols-12 gap-4 items-center font-semibold text-slate-700">
              <div className="col-span-3">Start Time</div>
              <div className="col-span-3">End Time</div>
              <div className="col-span-2">Duration</div>
              <div className="col-span-3">Task Description</div>
              <div className="col-span-1">Actions</div>
            </div>
          </div>

          {/* Task Rows */}
          <div className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                duration={calculateDuration(task.startTime, task.endTime)}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            ))}
          </div>

          {/* Add Task Button */}
          <div className="p-6 border-t border-slate-100">
            <Button
              onClick={addTask}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Task
            </Button>
          </div>
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8" />
              </div>
              <p className="text-lg">No tasks planned for today</p>
              <p className="text-sm">Click "Add New Task" to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Planner;
