
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Bell, Plus, Trash2, Clock } from 'lucide-react';

interface Reminder {
  id: string;
  title: string;
  time: string;
  enabled: boolean;
  days: string[];
}

const Reminders = () => {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Morning Planning Session',
      time: '08:00',
      enabled: true,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    {
      id: '2',
      title: 'Lunch Break',
      time: '12:00',
      enabled: true,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    },
    {
      id: '3',
      title: 'End of Day Review',
      time: '17:00',
      enabled: false,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    }
  ]);

  const addReminder = () => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      title: 'New Reminder',
      time: '09:00',
      enabled: true,
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    };
    setReminders([...reminders, newReminder]);
  };

  const updateReminder = (id: string, updates: Partial<Reminder>) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, ...updates } : reminder
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const toggleDay = (reminderId: string, day: string) => {
    const reminder = reminders.find(r => r.id === reminderId);
    if (!reminder) return;

    const newDays = reminder.days.includes(day)
      ? reminder.days.filter(d => d !== day)
      : [...reminder.days, day];
    
    updateReminder(reminderId, { days: newDays });
  };

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-slate-600 hover:text-slate-800 p-2"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Calendar
          </Button>
          <h1 className="text-3xl font-bold text-slate-800">Reminders & Notifications</h1>
          <Button
            onClick={addReminder}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Reminder
          </Button>
        </div>

        {/* Reminders List */}
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <Card key={reminder.id} className="p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-200">
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className={`p-3 rounded-2xl ${reminder.enabled ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                  <Bell className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  {/* Title and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Reminder Title
                      </label>
                      <Input
                        value={reminder.title}
                        onChange={(e) => updateReminder(reminder.id, { title: e.target.value })}
                        className="rounded-xl shadow-sm border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Time
                      </label>
                      <div className="relative">
                        <Input
                          type="time"
                          value={reminder.time}
                          onChange={(e) => updateReminder(reminder.id, { time: e.target.value })}
                          className="rounded-xl shadow-sm border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                        />
                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  {/* Days Selection */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">
                      Repeat on
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {dayNames.map((day) => (
                        <Button
                          key={day}
                          variant={reminder.days.includes(day) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleDay(reminder.id, day)}
                          className={`rounded-xl w-12 h-10 p-0 text-xs ${
                            reminder.days.includes(day)
                              ? 'bg-blue-500 hover:bg-blue-600 text-white'
                              : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {day}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center space-y-4">
                  <Switch
                    checked={reminder.enabled}
                    onCheckedChange={(enabled) => updateReminder(reminder.id, { enabled })}
                  />
                  <Button
                    onClick={() => deleteReminder(reminder.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {reminders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8" />
              </div>
              <p className="text-lg">No reminders set</p>
              <p className="text-sm">Click "Add Reminder" to create your first notification</p>
            </div>
          </div>
        )}

        {/* Notification Permission Notice */}
        <Card className="mt-8 p-6 rounded-3xl shadow-lg bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Enable Browser Notifications</h3>
              <p className="text-sm text-blue-700 mb-3">
                To receive reminders, please allow notifications in your browser settings.
              </p>
              <Button
                onClick={() => {
                  if ('Notification' in window) {
                    Notification.requestPermission();
                  }
                }}
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
              >
                Enable Notifications
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reminders;
