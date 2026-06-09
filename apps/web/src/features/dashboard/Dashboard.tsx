import { useEffect } from 'react';
import { Timer } from '@/features/timer/components/Timer';
import { ProjectList } from '@/features/projects/components/ProjectList';
import { useProjectsStore } from '@/store/projects';

export const Dashboard = () => {
  const loadProjects = useProjectsStore((s) => s.load);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <main className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <section>
        <h2 className="mb-4 text-lg font-medium">Aujourd'hui</h2>
        <Timer />
      </section>

      <aside>
        <ProjectList />
      </aside>
    </main>
  );
};
