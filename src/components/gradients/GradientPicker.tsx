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

export const getTailwindGradientColors = (gradient: string) => {
  const fromClass = gradient.split(' ')[0];
  const toClass = gradient.split(' ')[1];
  
  // Tailwindのグラデーションカラーマップ
  const colorMap: { [key: string]: string } = {
    'from-purple-600': '#9333ea',
    'to-pink-500': '#ec4899',
    'from-blue-500': '#3b82f6',
    'to-teal-400': '#2dd4bf',
    'from-red-500': '#ef4444',
    'to-orange-400': '#fb923c',
    'from-green-500': '#22c55e',
    'from-indigo-500': '#6366f1',
    'to-purple-500': '#a855f7',
    'from-yellow-400': '#facc15',
    'to-orange-500': '#f97316',
    'from-green-400': '#4ade80',
    'to-blue-500': '#3b82f6',
    'from-pink-500': '#ec4899',
    'to-rose-500': '#f43f5e',
    'from-violet-600': '#7c3aed',
    'to-yellow-400': '#facc15',
    'from-emerald-400': '#34d399',
    'to-cyan-400': '#22d3ee'
  };

  
  let startColor = colorMap[fromClass] || '#000000';
  let endColor = colorMap[toClass] || '#000000';
  
  // CSS変数が使用されている場合、それらを実際の色に変換
  if (startColor.startsWith('var(--')) {
    const cssVarName = startColor.match(/var\(--(.*?)\)/)?.[1];
    if (cssVarName) {
      startColor = colorMap[`from-${cssVarName}`] || startColor;
    }
  }
  if (endColor.startsWith('var(--')) {
    const cssVarName = endColor.match(/var\(--(.*?)\)/)?.[1];
    if (cssVarName) {
      endColor = colorMap[`to-${cssVarName}`] || endColor;
    }
  }
  
  return { fromColor: startColor, toColor: endColor };
};

export const getPreviewStyle = (gradient: string, startColor: string, endColor: string) => {
  if (gradient === 'custom') {
    return {
      background: `linear-gradient(to right, ${startColor}, ${endColor})`
    };
  }
  
  const { fromColor, toColor } = getTailwindGradientColors(gradient);
  return {
    background: `linear-gradient(to right, ${fromColor}, ${toColor})`
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
        <div className="w-full h-16 rounded-lg shadow-inner border border-gray-200">
          <div 
            className="w-full h-full"
            style={getPreviewStyle(gradient, startColor, endColor)} 
          />
        </div>
      </div>
    </div>
  );
};
