
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from '@/pages/Planner';

interface ExportButtonProps {
  tasks: Task[];
  date: Date;
}

export const ExportButton = ({ tasks, date }: ExportButtonProps) => {
  const calculateDuration = (startTime: string, endTime: string): string => {
    if (!startTime || !endTime) return '0h 0m';
    
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    
    let diffMinutes = endMinutes - startMinutes;
    if (diffMinutes < 0) diffMinutes += 24 * 60;
    
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    return `${hours}h ${minutes}m`;
  };

  const exportToPDF = () => {
    const content = `
      <html>
        <head>
          <title>Daily Planner - ${format(date, 'yyyy-MM-dd')}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #1f2937; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
            th { background-color: #f9fafb; font-weight: 600; }
          </style>
        </head>
        <body>
          <h1>Daily Planner - ${format(date, 'EEEE, MMMM d, yyyy')}</h1>
          <table>
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Duration</th>
                <th>Task Description</th>
              </tr>
            </thead>
            <tbody>
              ${tasks.map(task => `
                <tr>
                  <td>${task.startTime}</td>
                  <td>${task.endTime}</td>
                  <td>${calculateDuration(task.startTime, task.endTime)}</td>
                  <td>${task.description}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `planner-${format(date, 'yyyy-MM-dd')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    const headers = ['Start Time', 'End Time', 'Duration', 'Task Description'];
    const csvContent = [
      headers.join(','),
      ...tasks.map(task => 
        [task.startTime, task.endTime, calculateDuration(task.startTime, task.endTime), `"${task.description}"`].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `planner-${format(date, 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl">
        <DropdownMenuItem onClick={exportToPDF} className="rounded-lg">
          <FileText className="w-4 h-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToCSV} className="rounded-lg">
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
