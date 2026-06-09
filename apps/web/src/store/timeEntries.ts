import { create } from 'zustand';
import { db, type TimeEntry } from '@/db';

interface TimeEntriesState {
  entries: TimeEntry[];
  todayEntries: TimeEntry[];
  loading: boolean;
  loadToday: () => Promise<void>;
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

export const useTimeEntriesStore = create<TimeEntriesState>((set, get) => ({
  entries: [],
  todayEntries: [],
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
    });
  },
}));
