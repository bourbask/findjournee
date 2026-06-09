import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '@/features/dashboard/Dashboard';

export const App = () => {
  return (
    <div className="mx-auto min-h-screen max-w-4xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-text-primary">
          Fin'djournée
        </h1>
      </header>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};
