import React from 'react';


interface SpaceCardProps {
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
  const getGradientStyle = (gradientValue?: string) => {
    if (!gradientValue) {
      return {
        background: 'linear-gradient(to right, #6366f1, #ec4899)'
      };
    }

    if (gradientValue.includes('from-[')) {
      const startColor = gradientValue.match(/from-\[(.*?)\]/)?.[1];
      const endColor = gradientValue.match(/to-\[(.*?)\]/)?.[1];
      return {
        background: `linear-gradient(to right, ${startColor}, ${endColor})`
      };
    }

    return {
      background: `linear-gradient(to right, var(--${gradientValue.split(' ')[0].replace('from-', '')}), var(--${gradientValue.split(' ')[1].replace('to-', '')}))`
    };
  };

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 cursor-pointer">
      {/* Card background with gradient */}
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
          <button className="flex items-center space-x-1 text-white bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out hover:bg-black/60">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
            </svg>
            <span>{likes}</span>
          </button>
        </div>

        <div className="flex justify-between items-center text-sm text-white/90 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-100">
          <span className="font-medium hover:text-white transition-colors duration-200">
            @{author.username || author.name}
          </span>
          <span className="text-white/80">{daysAgo} 日前</span>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;
