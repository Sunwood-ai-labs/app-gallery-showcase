import React from 'react';

interface GradientPickerProps {
  gradient: string;
  setGradient: (value: string) => void;
  startColor: string;
  setStartColor: (value: string) => void;
  endColor: string;
  setEndColor: (value: string) => void;
}

export const gradientPresets = [
  { name: 'カスタム', value: 'custom' },
  { name: 'パープルサンセット', value: 'from-purple-600 to-pink-500' },
  { name: 'オーシャンブリーズ', value: 'from-blue-500 to-teal-400' },
  { name: 'フレイムフレア', value: 'from-red-500 to-orange-400' },
  { name: 'フォレストミスト', value: 'from-green-500 to-teal-400' },
  { name: 'ミッドナイトドリーム', value: 'from-indigo-500 to-purple-500' },
  { name: 'サニーデライト', value: 'from-yellow-400 to-orange-500' },
  { name: 'ノーザンライト', value: 'from-green-400 to-blue-500' },
  { name: 'ベリーブラスト', value: 'from-pink-500 to-rose-500' },
  { name: 'サイバーパンク', value: 'from-violet-600 to-yellow-400' },
  { name: 'トロピカルパラダイス', value: 'from-emerald-400 to-cyan-400' },
];

export const getGradientValue = (gradient: string, startColor: string, endColor: string) => {
  if (gradient === 'custom') {
    return `from-[${startColor}] to-[${endColor}]`;
  }
  return gradient;
};

export const getPreviewStyle = (gradient: string, startColor: string, endColor: string) => {
  if (gradient === 'custom') {
    return {
      background: `linear-gradient(to right, ${startColor}, ${endColor})`
    };
  }
  const [fromColor, toColor] = gradient.split(' ');
  return {
    background: `linear-gradient(to right, var(--${fromColor.replace('from-', '')}), var(--${toColor.replace('to-', '')}))`
  };
};

export const GradientPicker: React.FC<GradientPickerProps> = ({
  gradient,
  setGradient,
  startColor,
  setStartColor,
  endColor,
  setEndColor,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        グラデーション
      </label>
      <div className="space-y-4">
        <select
          value={gradient}
          onChange={(e) => setGradient(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF9D00]"
        >
          {gradientPresets.map((preset) => (
            <option key={preset.value} value={preset.value}>
              {preset.name}
            </option>
          ))}
        </select>

        {gradient === 'custom' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                開始色
              </label>
              <input
                type="color"
                value={startColor}
                onChange={(e) => setStartColor(e.target.value)}
                className="w-full h-10 p-1 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                終了色
              </label>
              <input
                type="color"
                value={endColor}
                onChange={(e) => setEndColor(e.target.value)}
                className="w-full h-10 p-1 rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* グラデーションプレビュー */}
        <div 
          className="w-full h-16 rounded-lg shadow-inner" 
          style={getPreviewStyle(gradient, startColor, endColor)} 
        />
      </div>
    </div>
  );
};
