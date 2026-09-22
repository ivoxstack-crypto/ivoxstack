import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  layout?: 'horizontal' | 'vertical';
  showTagline?: boolean;
  className?: string;
  iconClassName?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  variant = 'light',
  layout = 'horizontal',
  showTagline = true,
  className = '',
  iconClassName = '',
}) => {
  const isDark = variant === 'dark';
  const mainTextColor = isDark ? 'text-white' : 'text-slate-900';
  const taglineGray = isDark ? 'text-slate-400' : 'text-slate-500';

  // Size mapping
  const sizeStyles = {
    sm: {
      icon: 'h-8 w-auto',
      title: 'text-lg',
      arrow: 'w-2 h-2 -top-0.5 -right-0.5',
      tagline: 'text-[5.8px] tracking-[0.06em] mt-[1px]',
    },
    md: {
      icon: 'h-10 sm:h-11 w-auto',
      title: 'text-xl sm:text-[22px]',
      arrow: 'w-2.5 h-2.5 -top-1 -right-0.5',
      tagline: 'text-[6.5px] sm:text-[7.2px] tracking-[0.065em] mt-[1.5px]',
    },
    lg: {
      icon: 'h-14 sm:h-16 w-auto',
      title: 'text-2xl sm:text-3xl',
      arrow: 'w-3 h-3 -top-1.5 -right-0.5',
      tagline: 'text-[8.5px] sm:text-[9.8px] tracking-[0.07em] mt-[2px]',
    },
    xl: {
      icon: 'h-20 sm:h-24 w-auto',
      title: 'text-3xl sm:text-4xl',
      arrow: 'w-3.5 h-3.5 -top-2 -right-1',
      tagline: 'text-[10.5px] sm:text-[12px] tracking-[0.075em] mt-[2.5px]',
    },
  }[size];

  const isVertical = layout === 'vertical';

  return (
    <div
      className={`inline-flex ${
        isVertical ? 'flex-col items-center text-center' : 'items-center'
      } gap-2.5 sm:gap-3 transition-transform ${className}`}
    >
      {/* Emblem Icon with 100% transparent background */}
      <img
        src="/ivoxstack-icon-transparent.png"
        alt="IvoxStack Emblem"
        className={`${sizeStyles.icon} object-contain drop-shadow-sm select-none shrink-0 ${iconClassName}`}
        loading="eager"
      />

      {/* Pure CSS/HTML Text Lockup: Scalable vector typography matching IvoxStack identity */}
      <div className={`flex flex-col leading-none select-none ${isVertical ? 'items-center' : 'items-stretch'}`}>
        {/* Top Wordmark: IvoxStack */}
        <div
          className={`font-black tracking-tight flex items-center font-sans ${sizeStyles.title} ${mainTextColor} shrink-0`}
          style={{ letterSpacing: '-0.02em' }}
        >
          <span>Ivox</span>
          <span className="text-[#F97316]">S</span>
          <span>tac</span>
          {/* Stylized 'k' with upward growth arrow accent from logo */}
          <span className="relative inline-flex items-center">
            <span>k</span>
            <span className={`absolute ${sizeStyles.arrow} text-[#F97316] pointer-events-none`}>
              <svg
                className="w-full h-full"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H9M17 7V15" />
              </svg>
            </span>
          </span>
        </div>

        {/* Bottom Tagline: GROW BRANDS DIGITALLY (Single space between words, calibrated alignment) */}
        {showTagline && (
          <div
            className={`uppercase font-bold whitespace-nowrap select-none font-sans flex items-center ${sizeStyles.tagline}`}
          >
            <span className="text-[#F97316]">G</span>
            <span className={taglineGray}>ROW&nbsp;</span>
            <span className={taglineGray}>BRANDS&nbsp;</span>
            <span className="text-[#0284C7]">D</span>
            <span className={taglineGray}>IGITALLY</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;
