import { useEffect } from 'react';
import { TimeEntryForm } from '@/features/entries/components/TimeEntryForm';
import { WeekView } from '@/features/entries/components/WeekView';
import { ProjectList } from '@/features/projects/components/ProjectList';
import { ExportButton } from '@/features/export/components/ExportButton';
import { useProjectsStore } from '@/store/projects';
import { useTimeEntriesStore } from '@/store/timeEntries';

export const Dashboard = () => {
  const loadProjects = useProjectsStore((s) => s.load);
  const loadWeek = useTimeEntriesStore((s) => s.loadWeek);

  useEffect(() => {
    loadProjects();
    loadWeek();
  }, [loadProjects, loadWeek]);

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        <section className="md:w-2/3">
          <WeekView />
        </section>

        <aside className="flex flex-col gap-4 md:w-1/3">
          <ProjectList />
          <TimeEntryForm />
        </aside>
      </div>

      <section className="pb-8">
        <ExportButton />
      </section>
    </main>
  );
};
