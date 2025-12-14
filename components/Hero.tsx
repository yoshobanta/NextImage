
import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { ThemeColor } from '../App';
import { BRAND_GRADIENTS } from '../constants';
import { SkeletonLoader } from './SkeletonLoader';

interface HeroProps {
  id?: string;
  subtitle: string;
  title: string;
  description: string;
  theme: ThemeColor;
  bgImage: string;
  bgVideo?: string;
  bgVideoRotate?: number; // degrees
  overlay: string;
  showReelButton?: boolean;
  align?: 'center' | 'left';
  animatedHeadline?: boolean;
  headlineWords?: string[];
  hideContent?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  id,
  subtitle,
  title,
  description,
  theme,
  bgImage,
  bgVideo,
  bgVideoRotate,
  overlay,
  showReelButton = false,
  align = 'center',
  animatedHeadline = true,
  headlineWords,
  hideContent = false,
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (!animatedHeadline || !sectionRef.current) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              setHasAnimated(true);
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }, [animatedHeadline, hasAnimated]);

    const wordList = headlineWords && headlineWords.length > 0
      ? headlineWords
      : title.replace(/\n/g, ' ').trim().split(/\s+/).filter(Boolean);

    const headlineBaseDelaySeconds = 0.2;
    const wordStaggerSeconds = 1.0;
    const wordDurationSeconds = 0.9;
    const lastWordFinishSeconds = headlineBaseDelaySeconds + ((Math.max(wordList.length - 1, 0)) * wordStaggerSeconds) + wordDurationSeconds;
    const descriptionDelaySeconds = lastWordFinishSeconds + 0.4;

    const subtitleColorClass = 'text-[rgba(160,225,245,0.95)]';
    const gradientStyle: React.CSSProperties = {
      background: BRAND_GRADIENTS[theme] || BRAND_GRADIENTS['white'],
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
    };

    return (
      <section ref={sectionRef} id={id} className="relative h-screen-dvh w-full overflow-hidden flex items-center justify-center bg-black">
        {animatedHeadline && (
          <style>{`
            @keyframes wordFadeIn { 0% { opacity:0; transform:translateY(0.25em);} 100% { opacity:1; transform:translateY(0);} }
            @keyframes descriptionLateFade { 0% { opacity:0;} 100% { opacity:1;} }
          `}</style>
        )}
        <div className="absolute inset-0 z-0">
          {!bgLoaded && !bgVideo && (
            <SkeletonLoader className="absolute inset-0 w-full h-full rounded-none" variant="image" />
          )}
          {bgVideo ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <video
                src={bgVideo}
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={() => setBgLoaded(true)}
                className={`transition-opacity duration-700 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  objectFit: 'cover',
                  transform: bgVideoRotate ? `rotate(${bgVideoRotate}deg)` : undefined,
                  width: (bgVideoRotate === 90 || bgVideoRotate === -90) ? '100vh' : '100%',
                  height: (bgVideoRotate === 90 || bgVideoRotate === -90) ? '100vw' : '100%',
                }}
              />
            </div>
          ) : (
            <>
              <img 
                src={bgImage} 
                alt="Hero background"
                className={`w-full h-full object-cover transition-opacity duration-700 ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setBgLoaded(true)}
                onError={() => setBgLoaded(true)}
              />
            </>
          )}
          <div className={`absolute inset-0 transition-colors duration-1000 ${overlay}`} />
          <div className={`absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none transition-colors duration-1000 ${
            theme === 'teal' ? 'bg-teal-900' : theme === 'orange' ? 'bg-orange-900' : theme === 'purple' ? 'bg-purple-900' : 'bg-black'
          }`} />
        </div>

        {!hideContent && (
          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center sm:text-left w-full pt-20 sm:pt-0">
            <div className="overflow-hidden">
              <p
                className={`text-sm md:text-lg font-bold tracking-[0.5em] uppercase mb-6 font-poppins ${subtitleColorClass} ${align === 'center' ? 'text-center' : 'text-left'}`}
                style={animatedHeadline && hasAnimated ? {
                  opacity: 0,
                  animation: 'descriptionLateFade 0.8s ease forwards',
                  animationDelay: `${lastWordFinishSeconds}s`,
                } : animatedHeadline ? { opacity: 0 } : undefined}
              >
                {subtitle}
              </p>
              <div className={`${align === 'center' ? 'mx-auto' : ''} h-[3px] w-24 rounded-full mb-10`} style={{ background: BRAND_GRADIENTS[theme] }} />
            </div>

            <h1
              className={`font-bold mb-8 leading-tight tracking-tight drop-shadow-2xl uppercase font-montserrat ${align === 'center' ? 'text-center' : 'text-left'}`}
              style={{
                fontSize: animatedHeadline ? 'clamp(3.5em, 8vw, 5em)' : 'clamp(5em, 9vw, 9em)',
                letterSpacing: '0.02em',
                fontFamily: 'Montserrat, Bebas Neue, Arial, sans-serif',
                fontWeight: 900,
                lineHeight: 1.05,
                textTransform: 'uppercase',
              }}
            >
              {animatedHeadline ? (
                wordList.length > 0 ? (
                  <span style={{ display: 'block' }}>
                    {wordList.map((word, idx) => (
                      <span
                        key={idx}
                        style={{
                          display: 'inline-block',
                          opacity: 0,
                          animation: hasAnimated ? `wordFadeIn ${wordDurationSeconds}s ease forwards` : 'none',
                          animationDelay: hasAnimated ? `${headlineBaseDelaySeconds + idx * wordStaggerSeconds}s` : '0s',
                          marginRight: idx === wordList.length - 1 ? 0 : '0.35em',
                          ...gradientStyle,
                        }}
                      >
                        {word}
                      </span>
                    ))}
                  </span>
                ) : null
              ) : (
                <span style={gradientStyle}>{title}</span>
              )}
            </h1>

            {!animatedHeadline && (
              <p
                className={`mb-12 font-light leading-relaxed font-poppins ${align === 'center' ? 'text-center' : 'text-left'}`}
                style={{
                  fontSize: '1.1em',
                  color: '#fff',
                  fontFamily: 'Poppins, Roboto, Arial, sans-serif',
                  maxWidth: '40em',
                  marginLeft: align === 'center' ? 'auto' : undefined,
                  marginRight: align === 'center' ? 'auto' : undefined,
                }}
              >
                {description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-6 justify-center sm:justify-start">
              {showReelButton && (
                <button className={`flex items-center justify-center gap-2 px-10 py-4 border border-white/30 backdrop-blur-sm text-white font-bold uppercase tracking-wider hover:bg-white/10 transition-colors ${theme === 'orange' ? 'hover:border-orange-500 hover:text-orange-400' : ''}`}>
                  <Play className="w-5 h-5 fill-current" />
                  Watch Reel
                </button>
              )}
            </div>
          </div>
        )}

        {animatedHeadline && !hideContent && (
          <div className="absolute bottom-6 left-0 w-full px-6 z-20">
            <p
              className="font-light leading-relaxed font-poppins text-center"
              style={{
                fontSize: '1.1em',
                color: '#fff',
                fontFamily: 'Poppins, Roboto, Arial, sans-serif',
                maxWidth: '60em',
                margin: '0 auto',
                opacity: 0,
                animation: hasAnimated ? 'descriptionLateFade 0.8s ease forwards' : 'none',
                animationDelay: hasAnimated ? `${descriptionDelaySeconds}s` : '0s',
              }}
            >
              {description}
            </p>
          </div>
        )}
      </section>
    );
  };