import { jsx as _jsx } from "react/jsx-runtime";
const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'border border-border bg-surface text-text-primary hover:bg-surface-hover',
    ghost: 'text-text-secondary hover:bg-surface-hover hover:text-text-primary',
};
const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
};
export const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
    return (_jsx("button", { className: `cursor-pointer rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`, ...props, children: children }));
};
//# sourceMappingURL=Button.js.map