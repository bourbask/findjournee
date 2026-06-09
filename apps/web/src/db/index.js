import Dexie from 'dexie';
const db = new Dexie('findjournee');
db.version(1).stores({
    projects: 'id, name, archived, createdAt',
    timeEntries: 'id, projectId, start, end',
});
export { db };
//# sourceMappingURL=index.js.map