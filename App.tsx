
import React, { useState } from 'react';
import Home from './components/Home';
import Stats from './components/Stats';
import { LayoutGrid, BarChart2, Bell, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'stats'>('home');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">R</div>
          <h1 className="text-xl font-bold text-emerald-900">Ramadan Spirit</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="px-4 pt-6 md:px-8 max-w-lg mx-auto">
        {activeTab === 'home' ? <Home /> : <Stats />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-8 py-3 flex justify-around items-center z-50">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-emerald-600' : 'text-slate-400'}`}
        >
          <LayoutGrid size={24} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Tracker</span>
        </button>
        
        <div className="relative -top-6">
          <button 
            className="w-14 h-14 bg-emerald-600 rounded-full shadow-lg shadow-emerald-200 border-4 border-white flex items-center justify-center text-white active:scale-95 transition-transform"
            onClick={() => setActiveTab('home')}
          >
            <LayoutGrid size={24} />
          </button>
        </div>

        <button 
          onClick={() => setActiveTab('stats')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'stats' ? 'text-emerald-600' : 'text-slate-400'}`}
        >
          <BarChart2 size={24} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Analytics</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
