import { useState } from 'react';
import { useProjectsStore } from '@/store/projects';

export const ProjectList = () => {
  const [newName, setNewName] = useState('');
  const projects = useProjectsStore((s) => s.projects);
  const addProject = useProjectsStore((s) => s.add);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    await addProject(newName.trim());
    setNewName('');
  };

  return (
    <div className="rounded-card border border-border bg-surface p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-text-secondary">
        Projets
      </h3>

      <form onSubmit={handleSubmit} className="mb-3 flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nouveau projet..."
          className="min-h-[48px] flex-1 rounded-lg border-2 border-border bg-surface px-4 text-base text-text-primary placeholder:text-text-secondary"
        />
        <button
          type="submit"
          disabled={!newName.trim()}
          className="min-h-[48px] cursor-pointer rounded-lg bg-primary-600 px-5 text-base font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-40"
        >
          +
        </button>
      </form>

      <ul className="space-y-1">
        {projects.map((p) => (
          <li
            key={p.id}
            className="min-h-[44px] cursor-pointer rounded-lg px-4 py-3 text-base text-text-primary transition-colors hover:bg-surface-hover active:bg-surface-hover"
          >
            <span
              className="mr-3 inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            {p.name}
          </li>
        ))}
        {projects.length === 0 && (
          <li className="py-8 text-center text-base text-text-secondary">
            Aucun projet pour le moment.
          </li>
        )}
      </ul>
    </div>
  );
};
