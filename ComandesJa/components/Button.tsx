import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'cta';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  // Base styles
  const baseStyles = "font-heading font-bold rounded-2xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 relative overflow-hidden group cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary";

  // Specific visual variants
  const variants = {
    primary: "bg-primary text-white shadow-clay border-t border-white/30 hover:bg-green-600",
    secondary: "bg-white text-text shadow-clay border-t border-white/50 hover:bg-gray-50",
    accent: "bg-accent text-white shadow-clay border-t border-white/30 hover:bg-green-400",
    // Designed to match 'Empezar Gratis ->' reference: Solid darker green, cleaner look
    cta: "bg-[#16a34a] text-white shadow-lg border-t border-white/20 hover:bg-[#15803d] hover:shadow-xl hover:shadow-green-900/30 hover:-translate-y-1 active:translate-y-0",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      {/* Subtle shine animation for CTA only */}
      {variant === 'cta' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
      )}
    </button>
  );
};

export default Button;