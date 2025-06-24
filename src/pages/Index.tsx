
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle, BarChart3, Bell } from 'lucide-react';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      console.log('Date selected:', date);
      setSelectedDate(date);
      const dateStr = format(date, 'yyyy-MM-dd');
      console.log('Navigating to:', `/planner/${dateStr}`);
      navigate(`/planner/${dateStr}`);
    }
  };

  const handlePlanToday = () => {
    const today = new Date();
    const dateStr = format(today, 'yyyy-MM-dd');
    console.log('Planning today:', dateStr);
    navigate(`/planner/${dateStr}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Productivity Planner</h1>
          <p className="text-slate-600 text-lg">Plan your perfect day, track your progress</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 mb-8">
          <Button
            onClick={handlePlanToday}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Plan Today
          </Button>
          <Button
            onClick={() => navigate('/analytics')}
            variant="outline"
            className="border-slate-300 text-slate-700 px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Analytics
          </Button>
          <Button
            onClick={() => navigate('/reminders')}
            variant="outline"
            className="border-slate-300 text-slate-700 px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Bell className="w-5 h-5 mr-2" />
            Reminders
          </Button>
        </div>

        {/* Calendar */}
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="w-full pointer-events-auto"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center text-slate-800 font-semibold",
              caption_label: "text-lg font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-lg hover:bg-slate-100",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-slate-500 rounded-md w-9 font-normal text-sm",
              row: "flex w-full mt-2",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-100 first:[&:has([aria-selected])]:rounded-l-2xl last:[&:has([aria-selected])]:rounded-r-2xl focus-within:relative focus-within:z-20 rounded-lg",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer",
              day_selected: "bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600",
              day_today: "bg-slate-200 text-slate-900 font-semibold",
              day_outside: "text-slate-400 opacity-50",
            }}
          />
        </div>

        {/* Today's Quick Stats */}
        {selectedDate && (
          <div className="max-w-md mx-auto mt-8 bg-white rounded-3xl shadow-xl p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              {format(selectedDate, 'EEEE, MMMM d')}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-2xl">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-slate-600">Tasks Planned</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-2xl">
                <div className="text-2xl font-bold text-green-600">0h</div>
                <div className="text-sm text-slate-600">Total Time</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
