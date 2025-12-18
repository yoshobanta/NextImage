
import React, { useState } from 'react';
import { BRAND_GRADIENTS } from '../constants';
import { ArrowRight } from 'lucide-react';
import { ThemeColor } from '../App';
import { ImageSkeleton } from './SkeletonLoader';
import { GalleryPage } from './GalleryPage';

interface DetailSectionProps {
  theme: ThemeColor;
  title: string;
  description: string;
  images: string[]; // may include .mp4 sources
  allImages?: string[]; // Full collection for gallery modal
  hidePortfolioButton?: boolean; // Hide the explore portfolio button
}

export const DetailSection: React.FC<DetailSectionProps> = ({ theme, title, description, images, allImages, hidePortfolioButton = false }) => {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  
  const getButtonClasses = () => {
    switch (theme) {
      case 'teal': return 'hover:bg-teal-400 hover:text-black border-white text-black bg-white';
      case 'orange': return 'hover:bg-orange-500 hover:text-black border-white text-black bg-white';
      case 'purple': return 'hover:bg-purple-500 hover:text-white border-purple-500 text-white bg-purple-900/50';
      default: return 'bg-white text-black hover:bg-gray-200';
    }
  };

  const getAccentColor = () => {
    switch (theme) {
      case 'teal': return 'text-teal-400';
      case 'orange': return 'text-orange-500';
      case 'purple': return 'text-purple-500';
      default: return 'text-white';
    }
  };

  // Normalize gallery sources to always have 4 items; repeat if fewer
  const safeImages: string[] = Array.from({ length: 4 }, (_, i) => {
    const list = (images || []).filter(Boolean);
    if (list.length === 0) return '';
    return list[i % list.length];
  });
  const fallbackImage = safeImages.find((s) => s && !s.endsWith('.mp4')) || '';

  return (
    <section className="min-h-screen w-full bg-gunmetal py-24 px-4 relative flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <h2 className={`text-4xl md:text-6xl font-display font-bold leading-tight`}>                
              {title.split(' ').map((word, i) => {
                const isFirst = i === 0;
                const useGradient = theme === 'purple' && isFirst; // Magic Touch styling example for purple theme
                return (
                  <span
                    key={i}
                    className={`${isFirst && !useGradient ? getAccentColor() : 'text-white'} inline-block`}
                    style={useGradient ? {
                      background: BRAND_GRADIENTS[theme],
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent'
                    } : undefined}
                  >
                    {word}{' '}
                  </span>
                );
              })}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              {description}
            </p>
            
            {!hidePortfolioButton && (
              <button 
                onClick={() => setIsGalleryOpen(true)}
                className={`flex items-center justify-center gap-2 px-10 py-4 font-bold uppercase tracking-wider transition-all duration-300 group ${getButtonClasses()}`}
              >
                Explore Portfolio
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 mt-8">
              <div className="h-64 w-full bg-gray-800 rounded-lg overflow-hidden relative group">
                {!loadedImages[0] && !safeImages[0]?.endsWith('.mp4') && (
                  <ImageSkeleton className="absolute inset-0 w-full h-full rounded-lg" />
                )}
                {safeImages[0]?.endsWith('.mp4') ? (
                  <video src={safeImages[0]} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                ) : (
                  <img 
                    src={safeImages[0]} 
                    alt="Gallery 1" 
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 ${loadedImages[0] ? 'opacity-80' : 'opacity-0'}`}
                    style={{ objectPosition: '50% 30%' }}
                    onLoad={() => setLoadedImages(prev => ({ ...prev, 0: true }))}
                    onError={(e) => { 
                      setLoadedImages(prev => ({ ...prev, 0: true }));
                      if (fallbackImage) { (e.currentTarget as HTMLImageElement).src = fallbackImage; } 
                    }} 
                  />
                )}
              </div>
              <div className="h-48 w-full bg-gray-800 rounded-lg overflow-hidden relative group">
                {!loadedImages[1] && !safeImages[1]?.endsWith('.mp4') && (
                  <ImageSkeleton className="absolute inset-0 w-full h-full rounded-lg" />
                )}
                {safeImages[1]?.endsWith('.mp4') ? (
                  <video src={safeImages[1]} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                ) : (
                  <img 
                    src={safeImages[1]} 
                    alt="Gallery 2" 
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 ${loadedImages[1] ? 'opacity-80' : 'opacity-0'}`}
                    style={{ objectPosition: '50% 30%' }}
                    onLoad={() => setLoadedImages(prev => ({ ...prev, 1: true }))}
                    onError={(e) => { 
                      setLoadedImages(prev => ({ ...prev, 1: true }));
                      if (fallbackImage) { (e.currentTarget as HTMLImageElement).src = fallbackImage; } 
                    }} 
                  />
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-48 w-full bg-gray-800 rounded-lg overflow-hidden relative group">
                {!loadedImages[2] && !safeImages[2]?.endsWith('.mp4') && (
                  <ImageSkeleton className="absolute inset-0 w-full h-full rounded-lg" />
                )}
                {safeImages[2]?.endsWith('.mp4') ? (
                  <video src={safeImages[2]} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                ) : (
                  <img 
                    src={safeImages[2]} 
                    alt="Gallery 3" 
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 ${loadedImages[2] ? 'opacity-80' : 'opacity-0'}`}
                    style={{ objectPosition: '50% 30%' }}
                    onLoad={() => setLoadedImages(prev => ({ ...prev, 2: true }))}
                    onError={(e) => { 
                      setLoadedImages(prev => ({ ...prev, 2: true }));
                      if (fallbackImage) { (e.currentTarget as HTMLImageElement).src = fallbackImage; } 
                    }} 
                  />
                )}
              </div>
              <div className="h-64 w-full bg-gray-800 rounded-lg overflow-hidden relative group">
                {!loadedImages[3] && !safeImages[3]?.endsWith('.mp4') && (
                  <ImageSkeleton className="absolute inset-0 w-full h-full rounded-lg" />
                )}
                {safeImages[3]?.endsWith('.mp4') ? (
                  <video src={safeImages[3]} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                ) : (
                  <img 
                    src={safeImages[3]} 
                    alt="Gallery 4" 
                    className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 ${loadedImages[3] ? 'opacity-80' : 'opacity-0'}`}
                    style={{ objectPosition: '50% 30%' }}
                    onLoad={() => setLoadedImages(prev => ({ ...prev, 3: true }))}
                    onError={(e) => { 
                      setLoadedImages(prev => ({ ...prev, 3: true }));
                      if (fallbackImage) { (e.currentTarget as HTMLImageElement).src = fallbackImage; } 
                    }} 
                  />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Gallery Page */}
      <GalleryPage
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={allImages || images}
        theme={theme}
        title={title}
      />
    </section>
  );
};