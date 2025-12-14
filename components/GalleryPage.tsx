import React, { useState, useRef, useEffect } from 'react';
import { X, ArrowLeft, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { ThemeColor } from '../App';

interface GalleryPageProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  theme: ThemeColor;
  title: string;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  isOpen,
  onClose,
  images,
  theme,
  title
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  const getThemeColor = () => {
    switch (theme) {
      case 'teal': return 'bg-teal-500';
      case 'orange': return 'bg-orange-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-white';
    }
  };

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev! > 0 ? prev! - 1 : images.length - 1));
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => (prev! < images.length - 1 ? prev! + 1 : 0));
    }
  };

  const handleDownload = () => {
    if (selectedImage !== null) {
      const link = document.createElement('a');
      link.href = images[selectedImage];
      link.download = `gallery-${selectedImage + 1}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Lightbox view
  if (selectedImage !== null) {
    const currentMedia = images[selectedImage];
    const isVideo = currentMedia?.endsWith('.mp4');

    // Unmute video when play is clicked
    useEffect(() => {
      const video = videoRef.current;
      if (video && isVideo) {
        const handlePlay = () => {
          video.muted = false;
        };
        video.addEventListener('play', handlePlay);
        return () => video.removeEventListener('play', handlePlay);
      }
    }, [isVideo, currentMedia]);

    return (
      <div className="fixed inset-0 z-[9999] bg-black">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-black/90 p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setSelectedImage(null)}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
            >
              <ArrowLeft size={24} />
              <span>Back to Gallery</span>
            </button>
            
            <div>
              <p className="text-white text-lg">
                {selectedImage + 1} / {images.length}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {!isVideo && (
                <button
                  onClick={handleDownload}
                  className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="Download"
                >
                  <Download size={24} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="absolute inset-0 flex items-center justify-center p-4 pt-24">
          {isVideo ? (
            <video
              ref={videoRef}
              key={currentMedia}
              src={currentMedia}
              controls
              muted
              loop
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <img
              src={currentMedia}
              alt={`Gallery ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          )}

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all hover:scale-110"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all hover:scale-110"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    );
  }

  // Grid Gallery view
  return (
    <div className="fixed inset-0 z-[9999] bg-gunmetal overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gunmetal/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-white text-3xl font-bold">{title}</h2>
            <p className="text-gray-400 mt-1">{images.length} {images.length === 1 ? 'item' : 'items'}</p>
          </div>
          <button
            onClick={onClose}
            className="p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Close Gallery"
          >
            <X size={28} />
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img, idx) => {
            const isVideo = img.endsWith('.mp4');
            return (
              <div
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className="aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden cursor-pointer group relative"
              >
                {isVideo ? (
                  <>
                    <video
                      src={img}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => e.currentTarget.pause()}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                      </div>
                    </div>
                  </>
                ) : (
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ objectPosition: '50% 30%' }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
