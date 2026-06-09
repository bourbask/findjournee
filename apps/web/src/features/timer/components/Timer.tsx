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
    <div className="rounded-card border border-border bg-surface p-4 shadow-sm md:p-6">
      <select
        value={activeId ?? ''}
        onChange={(e) => setActive(e.target.value || null)}
        className="mb-4 w-full rounded-lg border-2 border-border bg-surface px-4 py-3 text-base text-text-primary"
      >
        <option value="">Choisir un projet...</option>
        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <div className="mb-6 text-center">
        <span className="font-mono text-5xl font-semibold tracking-wider tabular-nums md:text-6xl">
          {formatDuration(elapsed)}
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={handleMainClick}
          className="min-h-[52px] cursor-pointer rounded-xl bg-primary-600 px-8 text-lg font-medium text-white transition-colors hover:bg-primary-700 active:bg-primary-800"
        >
          {mainLabel}
        </button>

        <button
          onClick={handleStop}
          disabled={elapsed === 0}
          className="min-h-[52px] cursor-pointer rounded-xl border-2 border-red-200 bg-surface px-8 text-lg font-medium text-red-600 transition-colors hover:bg-red-50 active:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Stop
        </button>
      </div>
    </div>
  );
};
