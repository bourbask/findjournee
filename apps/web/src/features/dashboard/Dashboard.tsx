import { useEffect } from 'react';
import { Timer } from '@/features/timer/components/Timer';
import { ProjectList } from '@/features/projects/components/ProjectList';
import { TodayEntries } from '@/features/entries/components/TodayEntries';
import { ExportButton } from '@/features/export/components/ExportButton';
import { useProjectsStore } from '@/store/projects';
import { useTimeEntriesStore } from '@/store/timeEntries';

export const Dashboard = () => {
  const loadProjects = useProjectsStore((s) => s.load);
  const loadToday = useTimeEntriesStore((s) => s.loadToday);

  useEffect(() => {
    loadProjects();
    loadToday();
  }, [loadProjects, loadToday]);

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <section className="md:w-2/3">
          <h2 className="mb-3 text-base font-medium uppercase tracking-wide text-text-secondary md:mb-4">
            Chrono
          </h2>
          <Timer />
        </section>

        <aside className="md:w-1/3">
          <ProjectList />
        </aside>
      </div>

      <section>
        <TodayEntries />
      </section>

      <section className="pb-8">
        <ExportButton />
      </section>
    </main>
  );
};
