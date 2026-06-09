import { useTimeEntriesStore } from '@/store/timeEntries';
import { useProjectsStore } from '@/store/projects';
import { formatDuration } from '@/lib/formatDuration';

export const TodayEntries = () => {
  const entries = useTimeEntriesStore((s) => s.todayEntries);
  const projects = useProjectsStore((s) => s.projects);

  const total = entries.reduce((sum, e) => sum + e.duration, 0);

  const getProjectName = (id: string) =>
    projects.find((p) => p.id === id)?.name ?? 'Projet inconnu';

  if (entries.length === 0) {
    return (
      <div className="rounded-card border border-border bg-surface p-6 text-center shadow-sm">
        <p className="text-base text-text-secondary">
          Aucune entrée pour aujourd'hui.
        </p>
        <p className="mt-1 text-sm text-text-secondary">
          Lancez le chrono ou ajoutez une entrée manuellement.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-border bg-surface p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-secondary">
        Aujourd'hui
      </h3>

      <ul className="divide-y divide-border">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="flex items-center justify-between py-3"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-medium text-text-primary">
                {getProjectName(entry.projectId)}
              </p>
              {entry.description && (
                <p className="truncate text-sm text-text-secondary">
                  {entry.description}
                </p>
              )}
            </div>
            <span className="ml-4 font-mono text-base tabular-nums text-text-secondary">
              {formatDuration(entry.duration)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <span className="text-sm font-medium text-text-secondary">Total</span>
        <span className="font-mono text-lg font-semibold tabular-nums text-text-primary">
          {formatDuration(total)}
        </span>
      </div>
    </div>
  );
};
