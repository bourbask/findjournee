import Dexie, { type EntityTable } from 'dexie';

export interface Project {
  id: string;
  name: string;
  color?: string;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeEntry {
  id: string;
  projectId: string;
  description: string;
  start: Date;
  end: Date | null;
  duration: number;
  createdAt: Date;
}

const db = new Dexie('findjournee') as Dexie & {
  projects: EntityTable<Project, 'id'>;
  timeEntries: EntityTable<TimeEntry, 'id'>;
};

db.version(1).stores({
  projects: 'id, name, archived, createdAt',
  timeEntries: 'id, projectId, start, end',
});

export { db };
