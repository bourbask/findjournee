import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export const Timer = () => {
    const [running, setRunning] = useState(false);
    return (_jsxs("div", { className: "rounded-card border border-border bg-surface p-6 shadow-sm", children: [_jsx("div", { className: "mb-4 text-center", children: _jsx("span", { className: "font-mono text-4xl font-semibold tracking-wider tabular-nums text-timer-stopped", children: "00:00:00" }) }), _jsxs("div", { className: "flex justify-center gap-3", children: [_jsx("button", { onClick: () => setRunning((r) => !r), className: "cursor-pointer rounded-lg bg-primary-600 px-6 py-2 font-medium text-white transition-colors hover:bg-primary-700", children: running ? 'Pause' : 'Démarrer' }), _jsx("button", { disabled: !running, className: "cursor-pointer rounded-lg border border-border bg-surface px-6 py-2 font-medium text-text-primary transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40", children: "Stop" })] })] }));
};
//# sourceMappingURL=Timer.js.map