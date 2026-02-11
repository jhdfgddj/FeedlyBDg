
export interface PrayerSet {
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
}

export interface DeedSet {
  quran: boolean;
  dua: boolean;
  sadqa: boolean;
  dhikr: boolean;
}

export interface RamadanDay {
  date: string; // ISO string YYYY-MM-DD
  prayers: PrayerSet;
  deeds: DeedSet;
  fasting: boolean;
  progress: number;
}

export interface Quote {
  text: string;
  source: string;
}

export interface UserStats {
  totalFasts: number;
  totalPrayers: number;
  totalDeeds: number;
  avgCompletion: number;
}
