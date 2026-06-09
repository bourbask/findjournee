import { useTimeEntriesStore } from '@/store/timeEntries';
import { useProjectsStore } from '@/store/projects';
import { formatDuration } from '@/lib/formatDuration';

const DAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const WEEKDAY_COLORS = [
  'bg-primary-200',
  'bg-primary-300',
  'bg-primary-400',
  'bg-primary-500',
  'bg-primary-600',
  'bg-secondary-300',
  'bg-secondary-400',
];

type BarProps = { total: number; max: number; color: string };
const Bar = ({ total, max, color }: BarProps) => {
  const pct = max > 0 ? (total / max) * 100 : 0;
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-surface-dim">
      <div
        className={`h-full rounded-full transition-all ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
};

function getWeekLabel(days: { date: string }[]): string {
  if (days.length < 7) return '';
  const fmt = (s: string) => {
    const d = new Date(s + 'T00:00:00');
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };
  return `${fmt(days[0]!.date)} – ${fmt(days[6]!.date)}`;
}

export const WeekView = () => {
  const weekDays = useTimeEntriesStore((s) => s.weekDays);
  const loadWeek = useTimeEntriesStore((s) => s.loadWeek);
  const projects = useProjectsStore((s) => s.projects);
  const projectMap = new Map(projects.map((p) => [p.id, p.name]));

  const maxTotal = Math.max(...weekDays.map((d) => d.total), 1);

  return (
    <div className="rounded-card border border-border bg-surface p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-medium uppercase tracking-wide text-text-secondary">
          Semaine
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => loadWeek(-1)}
            className="min-h-[44px] min-w-[44px] cursor-pointer rounded-xl border-2 border-border bg-surface text-lg font-medium text-text-primary transition-colors hover:bg-primary-50"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => loadWeek(0)}
            className="min-h-[44px] min-w-[44px] cursor-pointer rounded-xl border-2 border-border bg-surface text-lg font-medium text-text-primary transition-colors hover:bg-primary-50"
          >
            Auj.
          </button>
          <button
            type="button"
            onClick={() => loadWeek(1)}
            className="min-h-[44px] min-w-[44px] cursor-pointer rounded-xl border-2 border-border bg-surface text-lg font-medium text-text-primary transition-colors hover:bg-primary-50"
          >
            →
          </button>
        </div>
      </div>

      <p className="mb-4 text-sm text-text-secondary">{getWeekLabel(weekDays)}</p>

      <div className="flex flex-col gap-3">
        {weekDays.map((day, i) => {
          const date = new Date(day.date + 'T00:00:00');
          const isToday =
            formatDate(new Date()) === day.date;
          return (
            <div key={day.date} className="flex items-center gap-3">
              <span
                className={`w-9 text-sm font-medium tabular-nums ${
                  isToday ? 'text-primary-600' : 'text-text-secondary'
                }`}
              >
                {DAY_LABELS[i]}{' '}
                <span className="font-mono">{date.getDate()}</span>
              </span>

              <div className="flex-1">
                <Bar total={day.total} max={maxTotal} color={WEEKDAY_COLORS[i]!} />
              </div>

              <span
                className={`w-16 text-right font-mono text-sm tabular-nums ${
                  day.total > 0 ? 'font-semibold text-text-primary' : 'text-text-secondary'
                }`}
              >
                {formatDuration(day.total)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <div className="text-right">
          <span className="text-sm font-medium text-text-secondary">
            Total semaine :{' '}
          </span>
          <span className="font-mono text-xl font-bold tabular-nums">
            {formatDuration(weekDays.reduce((a, d) => a + d.total, 0))}
          </span>
        </div>
      </div>

      {weekDays.some((d) => d.entries.length > 0) && (
        <details className="mt-4 group">
          <summary className="min-h-[44px] cursor-pointer list-none rounded-xl border-2 border-border px-4 text-sm font-medium text-text-secondary transition-colors hover:bg-primary-50">
            Détail des entrées
          </summary>
          <div className="mt-3 flex flex-col gap-2">
            {weekDays.map(
              (day) =>
                day.entries.length > 0 && (
                  <div key={day.date}>
                    <p className="mb-1 text-xs font-medium text-text-secondary">
                      {DAY_LABELS[new Date(day.date + 'T00:00:00').getDay() === 0 ? 6 : new Date(day.date + 'T00:00:00').getDay() - 1]}{' '}
                      {day.date}
                    </p>
                    {day.entries.map((e) => (
                      <div
                        key={e.id}
                        className="flex items-center justify-between rounded-lg bg-surface-dim px-3 py-2 text-sm"
                      >
                        <span className="text-text-primary">
                          {projectMap.get(e.projectId) ?? 'Inconnu'}
                          {e.description ? ` — ${e.description}` : ''}
                        </span>
                        <span className="font-mono text-text-secondary">
                          {formatDuration(e.duration)}
                        </span>
                      </div>
                    ))}
                  </div>
                ),
            )}
          </div>
        </details>
      )}
    </div>
  );
};

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}
