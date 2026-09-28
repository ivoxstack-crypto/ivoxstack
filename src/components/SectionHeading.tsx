import React from 'react';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'center' | 'left';
  /** Renders the title as the page <h1> instead of a section <h2>. */
  asPageTitle?: boolean;
  action?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'center',
  asPageTitle = false,
  action,
}) => {
  const Title = asPageTitle ? 'h1' : 'h2';
  const centered = align === 'center';

  return (
    <Reveal
      className={
        centered
          ? 'text-center max-w-3xl mx-auto'
          : 'flex flex-col md:flex-row md:items-end justify-between gap-6'
      }
    >
      <div className={centered ? '' : 'max-w-2xl'}>
        <span className="eyebrow">
          <span className="eyebrow-dot" />
          {eyebrow}
        </span>
        <Title
          className={`font-extrabold text-slate-950 tracking-tight mt-5 leading-[1.1] ${
            asPageTitle ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl lg:text-[44px]'
          }`}
        >
          {title}
        </Title>
        {description && (
          <p className={`text-slate-600 text-base sm:text-lg mt-4 leading-relaxed ${centered ? 'max-w-2xl mx-auto' : ''}`}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
};
