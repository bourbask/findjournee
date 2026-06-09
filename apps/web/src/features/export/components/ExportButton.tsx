import { useTimeEntriesStore } from '@/store/timeEntries';
import { useProjectsStore } from '@/store/projects';

function exportCSV() {
  const weekDays = useTimeEntriesStore.getState().weekDays;
  const projects = useProjectsStore.getState().projects;
  const projectMap = new Map(projects.map((p) => [p.id, p.name]));

  const rows = weekDays.flatMap((day) =>
    day.entries.map((e) => ({
      date: day.date,
      projet: projectMap.get(e.projectId) ?? 'Inconnu',
      debut: e.start.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      fin: e.end
        ? new Date(e.end).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        : '',
      duree: secondsToHMM(e.duration),
      description: e.description,
    })),
  );

  if (rows.length === 0) return;

  const header = 'Date;Projet;Début;Fin;Durée;Description';
  const csv = [header, ...rows.map((r) => [r.date, r.projet, r.debut, r.fin, r.duree, r.description].join(';'))].join('\n');

  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `findjournee_${weekDays[0]?.date ?? 'export'}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function secondsToHMM(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h}h${m.toString().padStart(2, '0')}`;
}

export const ExportButton = () => {
  return (
    <button
      type="button"
      onClick={exportCSV}
      className="flex min-h-[56px] w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 text-lg font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 active:bg-emerald-800"
    >
      <span className="text-xl">📤</span>
      Exporter
    </button>
  );
};
