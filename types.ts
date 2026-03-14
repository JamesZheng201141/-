export enum View {
  DAILY = 'DAILY',
  LIBRARY = 'LIBRARY',
  RECITATION = 'RECITATION',
  CHAT = 'CHAT',
  MY = 'MY'
}

export type Language = 'zh' | 'en';

export interface Sutra {
  id: string;
  title: string;
  titleEn?: string;
  shortDescription: string;
  shortDescriptionEn?: string;
  content: string; // The original text
  contentEn?: string; // English translation or transliteration
}

export interface DailyWisdomData {
  quote: string;
  source: string;
  reflection: string;
  date: string; // YYYY-MM-DD
}

export interface RecitationLog {
  id: string;
  date: string; // ISO String
  sutraTitle: string;
  timestamp: number;
}

export interface HistoryItem {
  title: string;
  period: string;
  content: string;
}
