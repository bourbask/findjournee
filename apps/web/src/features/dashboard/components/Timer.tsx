import { useState } from 'react';

export const Timer = () => {
  const [running, setRunning] = useState(false);

  return (
    <div className="rounded-card border border-border bg-surface p-6 shadow-sm">
      <div className="mb-4 text-center">
        <span className="font-mono text-4xl font-semibold tracking-wider tabular-nums text-timer-stopped">
          00:00:00
        </span>
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={() => setRunning((r) => !r)}
          className="cursor-pointer rounded-lg bg-primary-600 px-6 py-2 font-medium text-white transition-colors hover:bg-primary-700"
        >
          {running ? 'Pause' : 'Démarrer'}
        </button>

        <button
          disabled={!running}
          className="cursor-pointer rounded-lg border border-border bg-surface px-6 py-2 font-medium text-text-primary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          Stop
        </button>
      </div>
    </div>
  );
};
