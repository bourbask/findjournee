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
      <h3 className="mb-3 text-sm font-medium text-text-secondary uppercase tracking-wide">
        Projets
      </h3>

      <form onSubmit={handleSubmit} className="mb-3 flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nouveau projet..."
          className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary"
        />
        <button
          type="submit"
          disabled={!newName.trim()}
          className="cursor-pointer rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-40"
        >
          Ajouter
        </button>
      </form>

      <ul className="space-y-1">
        {projects.map((p) => (
          <li
            key={p.id}
            className="rounded-md px-3 py-2 text-sm text-text-primary transition-colors hover:bg-surface-hover"
          >
            <span
              className="mr-2 inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: p.color }}
            />
            {p.name}
          </li>
        ))}
        {projects.length === 0 && (
          <li className="py-4 text-center text-sm text-text-secondary">
            Aucun projet. Créez-en un pour commencer.
          </li>
        )}
      </ul>
    </div>
  );
};
