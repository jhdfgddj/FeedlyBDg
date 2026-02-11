
import React, { useState, useEffect } from 'react';
import { RamadanDay, Quote } from '../types';
import { storageService } from '../services/storageService';
import { geminiService } from '../services/geminiService';
import { INITIAL_QUOTES } from '../constants';
import ProgressBar from './ProgressBar';
import { 
  Moon, 
  Sun, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Heart, 
  Sparkles, 
  Clock,
  ArrowRight
} from 'lucide-react';

const Home: React.FC = () => {
  const [today, setToday] = useState<RamadanDay>(storageService.getDay(new Date().toISOString().split('T')[0]));
  const [quote, setQuote] = useState<Quote>(INITIAL_QUOTES[Math.floor(Math.random() * INITIAL_QUOTES.length)]);
  const [reflection, setReflection] = useState<string>("");
  const [loadingReflection, setLoadingReflection] = useState(false);

  useEffect(() => {
    fetchReflection();
  }, []);

  const fetchReflection = async () => {
    setLoadingReflection(true);
    const text = await geminiService.getDailyReflection();
    setReflection(text);
    setLoadingReflection(false);
  };

  const togglePrayer = (prayer: keyof typeof today.prayers) => {
    const updated = {
      ...today,
      prayers: { ...today.prayers, [prayer]: !today.prayers[prayer] }
    };
    setToday(updated);
    storageService.saveDay(updated);
  };

  const toggleDeed = (deed: keyof typeof today.deeds) => {
    const updated = {
      ...today,
      deeds: { ...today.deeds, [deed]: !today.deeds[deed] }
    };
    setToday(updated);
    storageService.saveDay(updated);
  };

  const toggleFasting = () => {
    const updated = { ...today, fasting: !today.fasting };
    setToday(updated);
    storageService.saveDay(updated);
  };

  const prayerLabels: Record<string, string> = {
    fajr: "Fajr",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha"
  };

  const deedIcons: Record<string, React.ReactNode> = {
    quran: <BookOpen className="w-5 h-5" />,
    dua: <Sparkles className="w-5 h-5" />,
    sadqa: <Heart className="w-5 h-5" />,
    dhikr: <Clock className="w-5 h-5" />
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pb-24">
      {/* Date & Progress */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-50">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h2>
            <p className="text-emerald-600 font-medium flex items-center gap-1">
              <Moon className="w-4 h-4" /> Ramadan Tracker
            </p>
          </div>
          <div className="text-right">
             <span className="text-sm text-slate-400">Today's Progress</span>
             <p className="text-xl font-bold text-emerald-700">{Math.round(today.progress)}%</p>
          </div>
        </div>
        <ProgressBar progress={today.progress} />
      </section>

      {/* Quote Section */}
      <section className="bg-emerald-900 text-emerald-50 p-6 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Moon size={100} />
        </div>
        <div className="relative z-10">
          <p className="italic text-lg mb-2 font-arabic leading-relaxed">"{quote.text}"</p>
          <p className="text-emerald-300 text-sm font-semibold">— {quote.source}</p>
        </div>
      </section>

      {/* Fasting Toggle */}
      <button 
        onClick={toggleFasting}
        className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all border-2 ${
          today.fasting 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
            : 'bg-white border-slate-100 text-slate-400'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${today.fasting ? 'bg-emerald-600 text-white' : 'bg-slate-100'}`}>
            <Sun className="w-6 h-6" />
          </div>
          <span className="font-bold text-lg">Currently Fasting</span>
        </div>
        {today.fasting ? <CheckCircle2 className="text-emerald-600" /> : <Circle />}
      </button>

      {/* Prayer Tracker */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Daily Prayers</h3>
        <div className="grid grid-cols-5 gap-2">
          {Object.keys(today.prayers).map((key) => {
            const prayerKey = key as keyof typeof today.prayers;
            const active = today.prayers[prayerKey];
            return (
              <button
                key={key}
                onClick={() => togglePrayer(prayerKey)}
                className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all ${
                  active ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-400 grayscale'
                }`}
              >
                <div className="p-2 bg-white/10 rounded-lg">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold">{prayerLabels[key]}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Good Deeds */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Good Deeds</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.keys(today.deeds).map((key) => {
            const deedKey = key as keyof typeof today.deeds;
            const active = today.deeds[deedKey];
            return (
              <button
                key={key}
                onClick={() => toggleDeed(deedKey)}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                  active 
                    ? 'bg-amber-50 border-amber-200 text-amber-900' 
                    : 'bg-slate-50 border-transparent text-slate-500'
                }`}
              >
                <div className={`p-2 rounded-lg ${active ? 'bg-amber-400 text-white' : 'bg-slate-200'}`}>
                  {deedIcons[key]}
                </div>
                <span className="font-bold capitalize">{key}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* AI Daily Reflection */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 border-l-4 border-l-emerald-500">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-500" /> Daily Reflection
          </h3>
          <button 
            onClick={fetchReflection}
            className="text-xs text-emerald-600 font-bold hover:underline disabled:opacity-50"
            disabled={loadingReflection}
          >
            {loadingReflection ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          {reflection || "Loading your spiritual guide for today..."}
        </p>
      </section>
    </div>
  );
};

export default Home;
