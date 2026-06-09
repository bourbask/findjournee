import { useState } from 'react';
import { useProjectsStore } from '@/store/projects';
import { useTimeEntriesStore } from '@/store/timeEntries';

const QUICK_DURATIONS = [
  { label: '30min', seconds: 1800 },
  { label: '1h', seconds: 3600 },
  { label: '2h', seconds: 7200 },
  { label: '3h', seconds: 10800 },
  { label: '4h', seconds: 14400 },
];

function toTimeInput(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function parseTimeInput(val: string): number {
  const [h, m] = val.split(':').map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

export const TimeEntryForm = () => {
  const projects = useProjectsStore((s) => s.projects);
  const addEntry = useTimeEntriesStore((s) => s.add);
  const loadWeek = useTimeEntriesStore((s) => s.loadWeek);

  const [projectId, setProjectId] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('10:00');
  const [description, setDescription] = useState('');

  const startMinutes = parseTimeInput(startTime);
  const endMinutes = parseTimeInput(endTime);
  const durationMinutes = endMinutes - startMinutes;
  const isValid = projectId && durationMinutes > 0;

  const handleQuickDuration = (seconds: number) => {
    const s = parseTimeInput(startTime);
    const e = s + Math.floor(seconds / 60);
    setEndTime(toTimeInput(e));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const startDate = new Date(`${date}T${startTime}:00`);
    const endDate = new Date(`${date}T${endTime}:00`);

    await addEntry({
      projectId,
      description,
      start: startDate,
      end: endDate,
      duration: durationMinutes * 60,
    });

    setDescription('');
    setEndTime(toTimeInput(parseTimeInput(startTime) + 60));
    loadWeek();
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-card border border-border bg-surface p-4 shadow-sm md:p-6">
      <h2 className="mb-4 text-base font-medium uppercase tracking-wide text-text-secondary">
        Nouvelle entrée
      </h2>

      <div className="mb-4">
        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
          className="min-h-[52px] w-full rounded-xl border-2 border-border bg-surface px-4 text-base text-text-primary"
        >
          <option value="">Choisir un projet...</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm text-text-secondary">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="min-h-[52px] w-full rounded-xl border-2 border-border bg-surface px-4 text-base text-text-primary"
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm text-text-secondary">Début</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
              const s = parseTimeInput(e.target.value);
              const e2 = parseTimeInput(endTime);
              if (e2 <= s) {
                setEndTime(toTimeInput(s + 60));
              }
            }}
            className="min-h-[52px] w-full rounded-xl border-2 border-border bg-surface px-4 text-base text-text-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-text-secondary">Fin</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="min-h-[52px] w-full rounded-xl border-2 border-border bg-surface px-4 text-base text-text-primary"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm text-text-secondary">
          Durée rapide
        </label>
        <div className="flex flex-wrap gap-2">
          {QUICK_DURATIONS.map((d) => (
            <button
              key={d.label}
              type="button"
              onClick={() => handleQuickDuration(d.seconds)}
              className="min-h-[44px] cursor-pointer rounded-xl border-2 border-border bg-surface px-5 text-base font-medium text-text-primary transition-colors hover:bg-primary-50 hover:border-primary-300 active:bg-primary-100"
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm text-text-secondary">
          Description (optionnelle)
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Coffrage, fondation..."
          className="min-h-[52px] w-full rounded-xl border-2 border-border bg-surface px-4 text-base text-text-primary placeholder:text-text-secondary"
        />
      </div>

      <div className="mb-4 text-center">
        <span className="font-mono text-2xl font-semibold tabular-nums">
          {durationMinutes > 0
            ? `${Math.floor(durationMinutes / 60)}h${durationMinutes % 60 > 0 ? `${durationMinutes % 60}min` : ''}`
            : '—'}
        </span>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="min-h-[56px] w-full cursor-pointer rounded-xl bg-primary-600 text-lg font-medium text-white transition-colors hover:bg-primary-700 active:bg-primary-800 disabled:opacity-40"
      >
        Ajouter
      </button>
    </form>
  );
};
