import React, { useState, useEffect } from 'react';
import { getTailwindGradientColors } from '@/components/gradients/GradientPicker';

interface SpaceCardProps {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  category: string;
  author: {
    name: string;
    image: string;
    username: string;
  };
  likes: number;
  daysAgo: number;
  runtime: string;
  gradient?: string;
}

const SpaceCard: React.FC<SpaceCardProps> = ({  
  id,
  title,
  subtitle,
  url,
  category,
  author,
  likes,
  daysAgo,
  runtime,
  gradient
}) => {
  const [clickCount, setClickCount] = useState(likes);

  useEffect(() => {
    const fetchClickCount = async () => {
      try {
        const response = await fetch(`/api/spaces/click?spaceId=${id}`);
        const data = await response.json();
        if (response.ok) {
          setClickCount(data.clickCount);
        }
      } catch (error) {
        console.error('Error fetching click count:', error);
      }
    };

    fetchClickCount();
  }, [id]);

  const recordClick = async () => {
    try {
      const response = await fetch('/api/spaces/click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ spaceId: id }),
      });
      const data = await response.json();
      if (response.ok) {
        setClickCount(data.clickCount);
      }
    } catch (error) {
      console.error('Error recording click:', error);
    }
  };

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    recordClick();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getGradientStyle = (gradientValue?: string) => {
    if (!gradientValue) {
      return {
        background: 'linear-gradient(to right, #6366f1, #ec4899)'
      };
    }

    // カスタムグラデーションの場合
    if (gradientValue.includes('from-[')) {
      const startColor = gradientValue.match(/from-\[(#[0-9a-fA-F]{6})\]/)?.[1];
      const endColor = gradientValue.match(/to-\[(#[0-9a-fA-F]{6})\]/)?.[1];
      if (startColor && endColor) {
        return {
          background: `linear-gradient(to right, ${startColor}, ${endColor})`
        };
      }
    }

    // プリセットグラデーションの場合
    const { fromColor, toColor } = getTailwindGradientColors(gradientValue);
    return {
      background: `linear-gradient(to right, ${fromColor}, ${toColor})`
    };
  };

  return (
    <a
      href="#"
      onClick={handleCardClick}
      className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 cursor-pointer block"
    >
      <div
        className="relative aspect-[16/9] flex flex-col items-center justify-center p-6 transition-all duration-300 ease-in-out group-hover:brightness-110 group-hover:contrast-125"
        style={getGradientStyle(gradient)}>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 opacity-20 transition-opacity duration-300 bg-gradient-to-br from-black/20 to-black/30" />
        
        {/* Title and Subtitle with animation */}
        <div className="relative z-10 space-y-2 text-center">
          <h3 className="text-2xl font-bold text-white break-words line-clamp-2 drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
            {title}
          </h3>
          <p className="text-sm text-white/90 line-clamp-1">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Hover overlay with animation */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-b from-black/0 via-black/20 to-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            <span className="inline-flex items-center gap-1 text-xs bg-green-500/80 backdrop-blur px-2 py-1 rounded-full text-white shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
              {runtime}
            </span>
            <span className="inline-flex items-center gap-1 text-xs bg-blue-500/80 backdrop-blur px-2 py-1 rounded-full text-white shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
              {category}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15.5 4.5a3.5 3.5 0 00-5-3.5c-1.5 0-3 .6-4 2-1-1.4-2.5-2-4-2a3.5 3.5 0 00-3.5 3.5c0 1.8.7 3.4 2.1 4.6l7.4 7.4 7.4-7.4c1.4-1.2 2.1-2.8 2.1-4.6z"/>
            </svg>
            <span>{clickCount || 0}回</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-white/90 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-100">
          <span className="font-medium hover:text-white transition-colors duration-200">
            @{author.username || author.name}
          </span>
          <span className="text-white/80">{daysAgo} 日前</span>
        </div>
      </div>
    </a>
  );
};

export default SpaceCard;
