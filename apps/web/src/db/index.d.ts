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
declare const db: Dexie & {
    projects: EntityTable<Project, "id">;
    timeEntries: EntityTable<TimeEntry, "id">;
};
export { db };
//# sourceMappingURL=index.d.ts.map