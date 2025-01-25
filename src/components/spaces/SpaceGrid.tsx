import React from 'react';
import { Space } from '@/types/space';
import SpaceCard from '@/components/SpaceCard';

interface SpaceGridProps {
  spaces: Space[];
  title?: string;
  limit?: number;
}

export const SpaceGrid: React.FC<SpaceGridProps> = ({ 
  spaces, 
  title,
  limit 
}) => {
  const displaySpaces = limit ? spaces.slice(0, limit) : spaces;

  return (
    <section>
      {title && (
        <h2 className="text-xl font-semibold mb-6">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displaySpaces.map((space, index) => (
          <SpaceCard
            key={space.id}
            {...space}
          />
        ))}
      </div>

      {displaySpaces.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No spaces found matching your search.</p>
        </div>
      )}
    </section>
  );
};
