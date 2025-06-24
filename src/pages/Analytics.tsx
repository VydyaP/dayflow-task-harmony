
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Calendar, Clock, BarChart3, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const navigate = useNavigate();

  // Mock data for demonstration
  const weeklyData = [
    { day: 'Mon', work: 6, personal: 2, study: 1, break: 1 },
    { day: 'Tue', work: 5, personal: 3, study: 1.5, break: 1.5 },
    { day: 'Wed', work: 7, personal: 1, study: 2, break: 1 },
    { day: 'Thu', work: 4, personal: 4, study: 1, break: 2 },
    { day: 'Fri', work: 6, personal: 2, study: 1.5, break: 1.5 },
    { day: 'Sat', work: 2, personal: 6, study: 0, break: 2 },
    { day: 'Sun', work: 1, personal: 7, study: 0, break: 2 },
  ];

  const categoryData = [
    { name: 'Work', value: 31, color: '#3b82f6' },
    { name: 'Personal', value: 25, color: '#10b981' },
    { name: 'Study', value: 7, color: '#8b5cf6' },
    { name: 'Break', value: 11, color: '#f59e0b' },
    { name: 'Meeting', value: 8, color: '#ef4444' },
    { name: 'Exercise', value: 6, color: '#14b8a6' },
  ];

  const stats = [
    { label: 'Total Hours This Week', value: '88h', icon: Clock, color: 'text-blue-600' },
    { label: 'Most Productive Day', value: 'Wednesday', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Average Daily Tasks', value: '12', icon: BarChart3, color: 'text-purple-600' },
    { label: 'Completion Rate', value: '92%', icon: Calendar, color: 'text-orange-600' },
  ];

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
          <h1 className="text-3xl font-bold text-slate-800">Analytics Dashboard</h1>
          <div></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <Tabs defaultValue="weekly" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white rounded-2xl p-1 shadow-md">
            <TabsTrigger value="weekly" className="rounded-xl">Weekly Overview</TabsTrigger>
            <TabsTrigger value="categories" className="rounded-xl">Category Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <Card className="p-8 rounded-3xl shadow-xl">
              <h3 className="text-xl font-semibold text-slate-800 mb-6">Weekly Time Distribution</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: 'none', 
                      borderRadius: '16px', 
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                    }} 
                  />
                  <Bar dataKey="work" stackId="a" fill="#3b82f6" name="Work" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="personal" stackId="a" fill="#10b981" name="Personal" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="study" stackId="a" fill="#8b5cf6" name="Study" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="break" stackId="a" fill="#f59e0b" name="Break" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-8 rounded-3xl shadow-xl">
                <h3 className="text-xl font-semibold text-slate-800 mb-6">Time by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-8 rounded-3xl shadow-xl">
                <h3 className="text-xl font-semibold text-slate-800 mb-6">Category Summary</h3>
                <div className="space-y-4">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="font-medium text-slate-700">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-800">{category.value}h</div>
                        <div className="text-sm text-slate-500">
                          {((category.value / categoryData.reduce((sum, cat) => sum + cat.value, 0)) * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
