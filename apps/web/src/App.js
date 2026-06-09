import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '@/features/dashboard/Dashboard';
export const App = () => {
    return (_jsxs("div", { className: "mx-auto min-h-screen max-w-4xl px-4 py-8", children: [_jsx("header", { className: "mb-8", children: _jsx("h1", { className: "text-2xl font-semibold text-text-primary", children: "Fin'djourn\u00E9e" }) }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] })] }));
};
//# sourceMappingURL=App.js.map