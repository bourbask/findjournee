import { create } from 'zustand';
import { db, type Project } from '@/db';

interface ProjectsState {
  projects: Project[];
  activeId: string | null;
  loading: boolean;
  load: () => Promise<void>;
  add: (name: string, color?: string) => Promise<Project>;
  archive: (id: string) => Promise<void>;
  setActive: (id: string | null) => void;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  projects: [],
  activeId: null,
  loading: false,

  load: async () => {
    set({ loading: true });
    const all = await db.projects
      .orderBy('createdAt')
      .reverse()
      .toArray();
    set({ projects: all.filter((p) => !p.archived), loading: false });
  },

  add: async (name: string, color?: string) => {
    const project: Project = {
      id: crypto.randomUUID(),
      name,
      color: color ?? '#2563eb',
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await db.projects.add(project);
    set({ projects: [project, ...get().projects] });
    return project;
  },

  archive: async (id: string) => {
    await db.projects.update(id, { archived: true, updatedAt: new Date() });
    set({ projects: get().projects.filter((p) => p.id !== id) });
  },

  setActive: (id: string | null) => {
    set({ activeId: id });
  },
}));
