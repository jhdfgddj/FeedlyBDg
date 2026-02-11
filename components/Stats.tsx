
import React, { useMemo } from 'react';
import { storageService } from '../services/storageService';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { Trophy, Calendar, Target, TrendingUp } from 'lucide-react';

const Stats: React.FC = () => {
  const allDays = storageService.getAllDays();

  const chartData = useMemo(() => {
    // Last 7 days
    const last7 = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const entry = allDays.find(day => day.date === dateStr);
      last7.push({
        name: d.toLocaleDateString('en-US', { weekday: 'short' }),
        progress: entry ? Math.round(entry.progress) : 0,
        fullDate: dateStr
      });
    }
    return last7;
  }, [allDays]);

  const stats = useMemo(() => {
    const totalDays = allDays.length;
    const avg = totalDays ? allDays.reduce((acc, curr) => acc + curr.progress, 0) / totalDays : 0;
    const fasts = allDays.filter(d => d.fasting).length;
    
    return {
      avg: Math.round(avg),
      totalFasts: fasts,
      streak: totalDays // Simplified streak
    };
  }, [allDays]);

  return (
    <div className="max-w-md mx-auto space-y-6 pb-24">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800">Your Journey</h2>
        <p className="text-slate-500">A look back at your Ramadan progress</p>
      </header>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full mb-2">
            <Trophy className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-slate-800">{stats.totalFasts}</span>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Fasts</span>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-full mb-2">
            <Target className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black text-slate-800">{stats.avg}%</span>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Avg Completion</span>
        </div>
      </div>

      {/* Weekly Chart */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-500" /> Weekly Activity
          </h3>
          <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-bold">Past 7 Days</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
              />
              <YAxis hide domain={[0, 100]} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-emerald-900 text-white p-2 rounded-lg text-xs font-bold shadow-xl">
                        {payload[0].value}% Complete
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="progress" radius={[10, 10, 10, 10]} barSize={30}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.progress > 75 ? '#059669' : entry.progress > 40 ? '#10b981' : '#d1fae5'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* History List */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-500" /> Recent Log
        </h3>
        <div className="space-y-3">
          {allDays.length === 0 && <p className="text-center text-slate-400 py-4 italic">No logs found. Start tracking!</p>}
          {allDays.slice().reverse().slice(0, 5).map((day) => (
            <div key={day.date} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
              <div>
                <p className="font-bold text-slate-700">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                <p className="text-xs text-slate-400">{day.fasting ? 'Fasting' : 'Not Fasting'}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-black px-2 py-1 rounded-full ${
                  day.progress > 80 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                }`}>
                  {Math.round(day.progress)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Stats;
