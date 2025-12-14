import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'image' | 'text' | 'circle';
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  className = '', 
  variant = 'image' 
}) => {
  const baseClasses = "animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%]";
  
  const variantClasses = {
    image: 'rounded-lg',
    text: 'rounded h-4',
    circle: 'rounded-full'
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
      <div 
        className={`${baseClasses} ${variantClasses[variant]} animate-shimmer ${className}`}
        aria-label="Loading..."
      />
    </>
  );
};

interface ImageSkeletonProps {
  className?: string;
}

export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ className = 'h-64 w-full' }) => {
  return <SkeletonLoader className={className} variant="image" />;
};

interface DetailSectionSkeletonProps {
  theme?: 'teal' | 'orange' | 'purple' | 'white';
}

export const DetailSectionSkeleton: React.FC<DetailSectionSkeletonProps> = ({ theme = 'teal' }) => {
  return (
    <section className="min-h-screen w-full bg-gunmetal py-24 px-4 relative flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content Skeleton */}
          <div className="space-y-8">
            <div className="space-y-4">
              <SkeletonLoader className="h-12 w-3/4" variant="text" />
              <SkeletonLoader className="h-12 w-2/3" variant="text" />
            </div>
            <div className="space-y-3">
              <SkeletonLoader className="h-4 w-full" variant="text" />
              <SkeletonLoader className="h-4 w-5/6" variant="text" />
              <SkeletonLoader className="h-4 w-4/5" variant="text" />
            </div>
            <SkeletonLoader className="h-14 w-48" variant="image" />
          </div>

          {/* Image Grid Skeleton */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 mt-8">
              <ImageSkeleton className="h-64 w-full" />
              <ImageSkeleton className="h-48 w-full" />
            </div>
            <div className="space-y-4">
              <ImageSkeleton className="h-48 w-full" />
              <ImageSkeleton className="h-64 w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface HeroSkeletonProps {
  theme?: 'teal' | 'orange' | 'purple' | 'white';
}

export const HeroSkeleton: React.FC<HeroSkeletonProps> = ({ theme = 'teal' }) => {
  return (
    <section className="relative h-screen-dvh w-full overflow-hidden flex items-center justify-center bg-black">
      <div className="absolute inset-0 z-0">
        <SkeletonLoader className="w-full h-full rounded-none" variant="image" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center sm:text-left w-full pt-20 sm:pt-0">
        <div className="space-y-6">
          <SkeletonLoader className="h-6 w-48 mx-auto sm:mx-0" variant="text" />
          <div className="space-y-4">
            <SkeletonLoader className="h-16 w-3/4 mx-auto sm:mx-0" variant="text" />
            <SkeletonLoader className="h-16 w-2/3 mx-auto sm:mx-0" variant="text" />
          </div>
          <SkeletonLoader className="h-6 w-full max-w-2xl mx-auto sm:mx-0" variant="text" />
          <SkeletonLoader className="h-14 w-56 mx-auto sm:mx-0 mt-8" variant="image" />
        </div>
      </div>
    </section>
  );
};
