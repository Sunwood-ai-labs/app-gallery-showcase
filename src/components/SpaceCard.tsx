import React, { useState } from 'react';
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
  clicks: number;
  daysAgo: number;
  runtime: string;
  createdAt: Date;
  gradient?: string;
  onLike?: (id: string, newLikeCount: number) => void;
}

const SpaceCard: React.FC<SpaceCardProps> = ({  
  id,
  title,
  subtitle,
  url,
  category,
  author,
  clicks,
  daysAgo,
  runtime,
  createdAt,
  gradient,
  onLike
}) => {
  const [clickCount, setClickCount] = useState(clicks);

  const handleCardClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    try {
      // クリック数を更新
      const response = await fetch('/api/spaces/click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ spaceId: id }),
      });

      if (response.ok) {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        // 親コンポーネントに通知
        onLike?.(id, newCount); // このコールバック名も後で更新します
      }
    } catch (error) {
      console.error('Error updating like count:', error);
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getTimeAgo = () => {
    const now = new Date();
    const date = new Date(createdAt);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}分前`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}時間前`;
    }
    
    // 7日以内の場合は日数を表示
    if (daysAgo < 7) {
      return `${daysAgo}日前`;
    }
    
    return date.toLocaleDateString('ja-JP');
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
          <div className="flex items-center space-x-1 text-white bg-red-500/80 backdrop-blur-sm px-2 py-1 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            <span>{clickCount || 0}</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-white/90 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-100">
          <span className="font-medium hover:text-white transition-colors duration-200">
            @{author.username || author.name}
          </span>
          <span className="text-white/80">{getTimeAgo()}</span>
        </div>
      </div>
    </a>
  );
};

export default SpaceCard;
