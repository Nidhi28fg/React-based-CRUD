import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, error, label, id, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label htmlFor={id} className="text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <input
                    id={id}
                    ref={ref}
                    className={twMerge(
                        clsx(
                            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                            error ? "border-red-500 focus-visible:ring-red-500" : "border-gray-300 focus-visible:ring-blue-500",
                            className
                        )
                    )}
                    {...props}
                />
                {error && <span className="text-sm text-red-500">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
