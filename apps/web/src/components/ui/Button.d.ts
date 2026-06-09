import type { ButtonHTMLAttributes, ReactNode } from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}
export declare const Button: ({ children, variant, size, className, ...props }: ButtonProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=Button.d.ts.map