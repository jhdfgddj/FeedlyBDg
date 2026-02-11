
import { RamadanDay, PrayerSet, DeedSet } from '../types';

const STORAGE_KEY = 'ramadan_tracker_v1';

export const storageService = {
  getAllDays: (): RamadanDay[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  getDay: (date: string): RamadanDay => {
    const days = storageService.getAllDays();
    const existing = days.find(d => d.date === date);
    
    if (existing) return existing;

    const newDay: RamadanDay = {
      date,
      prayers: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
      deeds: { quran: false, dua: false, sadqa: false, dhikr: false },
      fasting: true,
      progress: 0
    };
    
    return newDay;
  },

  saveDay: (day: RamadanDay) => {
    const days = storageService.getAllDays();
    const index = days.findIndex(d => d.date === day.date);
    
    // Calculate progress
    const prayerCount = Object.values(day.prayers).filter(Boolean).length;
    const deedCount = Object.values(day.deeds).filter(Boolean).length;
    const fastingWeight = day.fasting ? 1 : 0;
    
    // Weight: 5 prayers (5), 4 deeds (4), fasting (1) = 10 units
    day.progress = ((prayerCount + deedCount + fastingWeight) / 10) * 100;

    if (index > -1) {
      days[index] = day;
    } else {
      days.push(day);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(days));
  }
};
