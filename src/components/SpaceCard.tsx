import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getTailwindGradientColors } from '@/components/gradients/GradientPicker';
import { Pencil, Github, GitBranch, Globe, Code } from 'lucide-react';
import { toast } from 'sonner'; 
import Image from 'next/image';

interface SpaceCardProps {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  repository?: string;
  repoIcon?: string;
  category: string;
  author: {
    id: string;
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
  onDelete?: (id: string) => void;
}

const SpaceCard: React.FC<SpaceCardProps> = ({
  id,
  title,
  subtitle,
  url,
  repository,
  repoIcon,
  category,
  author,
  clicks,
  daysAgo,
  runtime,
  createdAt,
  gradient,
  onLike,
  onDelete
}) => {
  const [clickCount, setClickCount] = useState(clicks);
  const { data: session } = useSession();

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
        onLike?.(id, newCount);
      }
    } catch (error) {
      console.error('Error updating like count:', error);
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleRepoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (repository) {
      window.open(repository, '_blank', 'noopener,noreferrer');
    }
  };
  
  const getUrlTypeInfo = (urlString?: string) => {
    if (!urlString) return null;

    try {
      const url = new URL(urlString);
      
      // リポジトリホスティングサービスの判定
      if (url.hostname === 'github.com') {
        return {
          icon: <Github className="w-5 h-5 text-gray-700" />,
          text: 'GitHub'
        };
      }
      if (url.hostname === 'gitlab.com') {
        return {
          icon: <GitBranch className="w-5 h-5 text-gray-700" />,
          text: 'GitLab'
        };
      }
    } catch {
      // 無効なURLの場合
    }
    
    // その他のURL
    return {
      icon: <Globe className="w-5 h-5 text-gray-700" />,
      text: 'Website'
    };
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
        {/* Runtime and Category badges at top */}
        <div className="absolute top-2 left-0 right-0 flex justify-center gap-2 z-20">
          <span className="inline-flex items-center gap-1 text-xs bg-green-500/80 backdrop-blur px-2 py-1 rounded-full text-white shadow-lg">
            {runtime}
          </span>
          <span className="inline-flex items-center gap-1 text-xs bg-blue-500/80 backdrop-blur px-2 py-1 rounded-full text-white shadow-lg">
            {category}
          </span>
        </div>

        {/* Repository/Website icon */}
        {repository && (
          <div 
            onClick={handleRepoClick}
            className="absolute top-2 right-2 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 transition-transform duration-300 transform scale-90 hover:scale-100 z-20"
          >
            {repoIcon ? (
              <Image
                src={repoIcon}
                alt="Repository"
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : (
              getUrlTypeInfo(repository)?.icon
            )}
            <span className="text-xs font-medium text-gray-700">
              {getUrlTypeInfo(repository)?.text}
            </span>
          </div>
        )}

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 opacity-20 transition-opacity duration-300 bg-gradient-to-br from-black/20 to-black/30" />

        {/* Title and Subtitle with animation */}
        <div className="relative z-10 space-y-2 text-center mt-8">
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
        <div className="flex justify-start">
          {/* Edit and Delete Buttons */}
          {session?.user?.id === author?.id && (
            <Link 
              href={`/edit-space/${id}`}
              onClick={(e) => e.stopPropagation()}
              className="p-2 bg-white/80 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </Link>
          )}
        </div>
 
        <div className="flex flex-col items-center gap-3">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-sm text-white/90">
            <span className="font-medium hover:text-white transition-colors duration-200 bg-black/30 px-3 py-1 rounded-full">
              @{author.username || author.name}
            </span>
            <span className="text-white/80 bg-black/30 px-3 py-1 rounded-full">{getTimeAgo()}</span>
          </div>

          <div className="flex items-center space-x-1 text-white bg-red-500/80 backdrop-blur-sm px-4 py-2 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            <span className="text-sm font-medium">{clickCount || 0}</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default SpaceCard;
