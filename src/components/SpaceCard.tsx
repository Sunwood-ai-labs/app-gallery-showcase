import React from 'react';

interface SpaceCardProps {
  title: string;
  author: string;
  likes: number;
  daysAgo: number;
  isRunning?: boolean;
  runtime?: string;
}

const getGradient = (index: number) => {
  const gradients = [
    'from-purple-600 to-pink-500',
    'from-blue-500 to-teal-400',
    'from-red-500 to-orange-400',
    'from-green-500 to-teal-400',
    'from-indigo-500 to-purple-500',
    'from-yellow-400 to-orange-500'
  ];
  return gradients[index % gradients.length];
};

const SpaceCard: React.FC<SpaceCardProps & { index: number }> = ({
  title,
  author,
  likes,
  daysAgo,
  isRunning = true,
  runtime = 'ZENO',
  index
}) => {
  return (
    <div className="card-base">
      <div className={`card-gradient bg-gradient-to-br ${getGradient(index)} flex items-center justify-center p-6`} style={{ aspectRatio: '16/9' }}>
        <h3 className="card-title text-2xl font-bold text-white text-center break-words line-clamp-3 drop-shadow-lg">
          {title}
        </h3>
      </div>
      <div className="card-overlay absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex justify-between items-start">
          {isRunning && (
            <span className="card-status text-xs bg-green-500/80 backdrop-blur px-2 py-1 rounded-full text-white">
              Running on {runtime}
            </span>
          )}
          <div className="card-likes flex items-center space-x-1 text-white">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
            </svg>
            <span className="text-sm">{likes}</span>
          </div>
        </div>
        <div className="card-footer mt-auto">
          <div className="flex justify-between items-center text-sm text-white/80">
            <span>@{author}</span>
            <span>{daysAgo} days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceCard;
