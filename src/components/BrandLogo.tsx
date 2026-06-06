/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
  textColorClass?: string;
  showText?: boolean;
  animate?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 130,
  textColorClass = 'text-[#00A3E0]',
  showText = true,
  animate = true,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`flex items-center select-none ${className}`}>
      {!imgError ? (
        <img
          src="/logocmpl1.png"
          alt="Nerva"
          referrerPolicy="no-referrer"
          className={`shrink-0 object-contain max-w-full ${animate ? 'hover:scale-[1.03] transition-transform duration-300' : ''}`}
          style={{ height: `${size}px`, width: 'auto' }}
          onError={() => setImgError(true)}
        />
      ) : (
        /* Fallback: Old emblem + text if logocompl.png isn't accessible */
        <div className="flex items-center gap-2">
          <svg
            width={size * 0.7}
            height={size * 0.7}
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`shrink-0 ${animate ? 'hover:scale-105 transition-transform duration-300' : ''}`}
          >
            <circle cx="25" cy="25" r="7" fill="#00A3E0" />
            <circle cx="25" cy="95" r="7" fill="#00A3E0" />
            <circle cx="95" cy="25" r="7" fill="#00A3E0" />
            <circle cx="95" cy="95" r="7" fill="#00A3E0" />
            <path
              d="M25 25 L25 95"
              stroke="#00A3E0"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M95 25 L95 95"
              stroke="#00A3E0"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M25 25 L95 95"
              stroke="#00A3E0"
              strokeWidth="8"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
          {showText && (
            <div className="flex flex-col leading-none">
              <span className="text-xl md:text-2xl font-extrabold tracking-wider text-white">
                NERVA
              </span>
              <span className="text-[8px] uppercase tracking-widest text-slate-400">
                Informatique
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default BrandLogo;
