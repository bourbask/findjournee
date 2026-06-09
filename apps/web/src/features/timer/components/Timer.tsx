import { useTimer } from '../hooks/useTimer';
import { formatDuration } from '@/lib/formatDuration';
import { useTimeEntriesStore } from '@/store/timeEntries';
import { useProjectsStore } from '@/store/projects';

export const Timer = () => {
  const { elapsed, isRunning, start, pause, resume, stop } = useTimer();
  const addEntry = useTimeEntriesStore((s) => s.add);
  const projects = useProjectsStore((s) => s.projects);
  const activeId = useProjectsStore((s) => s.activeId);
  const setActive = useProjectsStore((s) => s.setActive);

  const handleMainClick = () => {
    if (elapsed === 0) start();
    else if (isRunning) pause();
    else resume();
  };

  const handleStop = () => {
    if (elapsed === 0) return;
    if (activeId) {
      addEntry({
        projectId: activeId,
        description: '',
        start: new Date(Date.now() - elapsed * 1000),
        end: new Date(),
        duration: elapsed,
      });
    }
    stop();
  };

  const mainLabel = elapsed === 0 ? 'Démarrer' : isRunning ? 'Pause' : 'Reprendre';

  return (
    <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
      <div className="mb-4">
        <select
          value={activeId ?? ''}
          onChange={(e) => setActive(e.target.value || null)}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-text-primary"
        >
          <option value="">Sélectionner un projet...</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 text-center">
        <span className="font-mono text-4xl font-semibold tracking-wider tabular-nums">
          {formatDuration(elapsed)}
        </span>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={handleMainClick}
          className="cursor-pointer rounded-lg bg-primary-600 px-6 py-2 font-medium text-white transition-colors hover:bg-primary-700"
        >
          {mainLabel}
        </button>

        <button
          onClick={handleStop}
          disabled={elapsed === 0}
          className="cursor-pointer rounded-lg border border-red-200 bg-surface px-6 py-2 font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Stop
        </button>
      </div>
    </div>
  );
};
