import { Timer } from './components/Timer';

export const Dashboard = () => {
  return (
    <main>
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-medium">Aujourd'hui</h2>
        <Timer />
      </section>
    </main>
  );
};
