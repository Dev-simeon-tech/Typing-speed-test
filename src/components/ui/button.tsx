import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "neutral";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const baseStyles =
  "inline-flex items-center cursor-pointer justify-center leading-none rounded-xl font-medium focus:ring-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 hover:bg-blue-400 py-4 px-6 ",
  secondary: "bg-neutral-0 text-neutral-900 hover:bg-neutral-0/90 py-2.5 px-4 ",
  neutral: "bg-neutral-800 hover:bg-neutral-500 px-4 py-3 focus:ring-neutral-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      isLoading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        {isLoading ? (
          <span className='flex items-center gap-2'>Loading...</span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
