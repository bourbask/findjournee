import { create } from 'zustand';
import { db, type TimeEntry } from '@/db';

export interface DaySummary {
  date: string;
  entries: TimeEntry[];
  total: number;
}

interface TimeEntriesState {
  entries: TimeEntry[];
  todayEntries: TimeEntry[];
  weekDays: DaySummary[];
  loading: boolean;
  loadToday: () => Promise<void>;
  loadWeek: (offset?: number) => Promise<void>;
  add: (entry: Omit<TimeEntry, 'id' | 'createdAt'>) => Promise<TimeEntry>;
  remove: (id: string) => Promise<void>;
}

function getTodayBounds(): [Date, Date] {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return [start, end];
}

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getSunday(d: Date): Date {
  const monday = getMonday(d);
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 7);
  return sunday;
}

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export const useTimeEntriesStore = create<TimeEntriesState>((set, get) => ({
  entries: [],
  todayEntries: [],
  weekDays: [],
  loading: false,

  loadToday: async () => {
    set({ loading: true });
    const [start, end] = getTodayBounds();
    const entries = await db.timeEntries
      .where('start')
      .between(start, end)
      .toArray();
    set({ todayEntries: entries, loading: false });
  },

  loadWeek: async (offset = 0) => {
    set({ loading: true });
    const ref = new Date();
    ref.setDate(ref.getDate() + offset * 7);
    const monday = getMonday(ref);
    const sunday = getSunday(ref);

    const all = await db.timeEntries
      .where('start')
      .between(monday, sunday)
      .toArray();

    const days: DaySummary[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(d.getDate() + i);
      const dateStr = formatDate(d);
      const entries = all.filter((e) => formatDate(e.start) === dateStr);
      const total = entries.reduce((acc, e) => acc + e.duration, 0);
      days.push({ date: dateStr, entries, total });
    }

    set({ weekDays: days, entries: all, loading: false });
  },

  add: async (entry) => {
    const timeEntry: TimeEntry = {
      id: crypto.randomUUID(),
      ...entry,
      createdAt: new Date(),
    };
    await db.timeEntries.add(timeEntry);
    set({ entries: [...get().entries, timeEntry] });
    return timeEntry;
  },

  remove: async (id: string) => {
    await db.timeEntries.delete(id);
    set({
      entries: get().entries.filter((e) => e.id !== id),
      todayEntries: get().todayEntries.filter((e) => e.id !== id),
      weekDays: get().weekDays.map((d) => ({
        ...d,
        entries: d.entries.filter((e) => e.id !== id),
        total: d.entries
          .filter((e) => e.id !== id)
          .reduce((acc, e) => acc + e.duration, 0),
      })),
    });
  },
}));
