import React from 'react';

interface ClayCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const ClayCard: React.FC<ClayCardProps> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div 
      className={`
        bg-white/40 
        backdrop-blur-xl 
        rounded-[2rem] 
        shadow-glass 
        border border-white/60
        relative
        overflow-hidden
        ${hoverEffect ? 'hover:shadow-glass-hover hover:bg-white/50 hover:border-white/80 hover:-translate-y-1 transition-all duration-500 ease-out' : ''}
        ${className}
      `}
    >
      {/* Optional: subtle glossy shine on top left */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none opacity-50"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ClayCard;