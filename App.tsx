import React, { useState, useEffect, useRef, Fragment } from 'react';
// Centralized assets (supports both local and external/CDN hosting)
import { heroImages, photos, videos } from './data/assets';
import { externalAssets, portraitVideos, editingSamples, landscapeVideos } from './data/external-assets';

// Stable hero assets sourced from centralized mapping
const photoHeroImg = heroImages.photography;
const videoHeroImg = heroImages.videography;
const editingHeroImg = heroImages.editing;
const servicesHeroImg = heroImages.services;

// Gallery images from external assets
const photoGallery1 = externalAssets.portrait.photos[30] || photos[0] || '';
const photoGallery2 = externalAssets.portrait.photos[91] || photos[1] || '';
const photoGallery3 = externalAssets.portrait.photos[76] || photos[2] || '';
const photoGallery4 = externalAssets.portrait.photos[71] || photos[3] || '';

import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { DetailSection } from './components/DetailSection';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Footer } from './components/Footer';

// Video and editing assets from external CDN
const ringCeremonyVideo = portraitVideos[4] || ''; // Ring_ceremony.mp4
const editingBgVideo = landscapeVideos[0] || ''; // Use landscape video as background for editing section
const editingImg1 = editingSamples[2] || ''; // Gemini_Generated_Image_dbh77dbh77dbh77d.png
const editingImg2 = editingSamples[1] || ''; // Gemini_Generated_Image_dbh77dbh77dbh77d_1.png
const editingImg3 = editingSamples[0] || ''; // edius-9-premier-video-editing-setup.jpg

export type ThemeColor = 'teal' | 'orange' | 'purple' | 'white';

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>('teal');
  const [isNavTransparent, setIsNavTransparent] = useState(true);
  
  // Refs for theme observation
  const photoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const editRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  // Random local photography detail images (selected once)
  const randomPhotoImagesRef = useRef<string[]>([]);
  // Random local videography clips (selected once)
  const randomVideoClipsRef = useRef<string[]>([]);
  // All photos for gallery modal
  const allPhotosRef = useRef<string[]>([]);
  // All videos for gallery modal
  const allVideosRef = useRef<string[]>([]);

  useEffect(() => {
    // Use external assets (Cloudinary CDN) for photos
    if (randomPhotoImagesRef.current.length === 0) {
      // Use photos from centralized assets (already includes portrait + landscape)
      const paths = [...photos];
      
      // Store all photos for gallery
      allPhotosRef.current = [...paths];
      
      // Shuffle paths for display
      for (let i = paths.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [paths[i], paths[j]] = [paths[j], paths[i]];
      }
      randomPhotoImagesRef.current = paths.slice(0, 8); // take first 8
    }
    
    // Use external assets (Cloudinary CDN) for videos
    if (randomVideoClipsRef.current.length === 0) {
      // Use videos from centralized assets (already includes portrait + landscape)
      const vpaths = [...videos];
      
      // Store all videos for gallery
      allVideosRef.current = [...vpaths];
      
      for (let i = vpaths.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [vpaths[i], vpaths[j]] = [vpaths[j], vpaths[i]];
      }
      randomVideoClipsRef.current = vpaths.slice(0, 4);
    }
    // 1. Theme Observer (Detects which main section is active)
    const themeObserverOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', 
      threshold: 0
    };

    const themeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'photography') setCurrentTheme('teal');
          if (entry.target.id === 'videography') setCurrentTheme('orange');
          if (entry.target.id === 'editing') setCurrentTheme('purple');
          if (entry.target.id === 'services') setCurrentTheme('white');
        }
      });
    }, themeObserverOptions);

    if (photoRef.current) themeObserver.observe(photoRef.current);
    if (videoRef.current) themeObserver.observe(videoRef.current);
    if (editRef.current) themeObserver.observe(editRef.current);
    if (servicesRef.current) themeObserver.observe(servicesRef.current);

    // 2. Transparency Observer (Detects if we are on a Hero page or Detail page)
    const transparencyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // If a Hero section is intersecting (>50%), Nav is transparent
          if (entry.target.getAttribute('data-type') === 'hero') {
            setIsNavTransparent(true);
          } 
          // If a Detail or Services section is intersecting (>50%), Nav is dark
          else if (entry.target.getAttribute('data-type') === 'detail' || entry.target.id === 'services-content') {
            setIsNavTransparent(false);
          }
        }
      });
    }, { threshold: 0.5 }); // Threshold ensures we switch when the section consumes most of the view

    // Observe all sections with data-type
    const sections = document.querySelectorAll('[data-type]');
    sections.forEach(el => transparencyObserver.observe(el));

    return () => {
      themeObserver.disconnect();
      transparencyObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-carbon text-white selection:bg-white/30 selection:text-white">
      <Navigation currentTheme={currentTheme} isTransparent={isNavTransparent} />
      
      <main className="flex flex-col w-full">

        {/* Photography Section (Hero + Detail) */}
        <div ref={photoRef} id="photography" className="w-full relative">
          <div className="w-full h-screen-dvh" data-type="hero">
            <Hero 
              id="photography-hero"
              subtitle="Fine Art Photography"
              title={"CAPTURING LIFE'S MASTERPIECE"}
              description="Award-winning photography services for weddings, portraits, and commercial projects. Every shot is a work of art."
              theme="teal"
              bgImage={photoHeroImg}
              overlay="bg-gradient-to-b from-black/80 via-black/20 to-black"
              align="center"
              animatedHeadline
              headlineWords={["CAPTURING", "LIFE'S", "MASTERPIECE"]}
            />
          </div>
          <div className="min-h-screen w-full" data-type="detail">
            <DetailSection 
              theme="teal"
              title="Timeless Moments"
              description="Our photography philosophy is rooted in capturing the unscripted, raw emotions that define your special day. We combine traditional techniques with modern artistry to create images that you will cherish for generations."
              images={[photoGallery1, photoGallery2, photoGallery3, photoGallery4]}
              allImages={allPhotosRef.current}
            />
          </div>
        </div>

        {/* Videography Section (Hero + Detail) */}
        <div ref={videoRef} id="videography" className="w-full relative">
          <div className="w-full h-screen-dvh" data-type="hero">
            <Hero 
              id="videography-hero"
              subtitle="Cinematic Storytelling"
              title="MOTION THAT MOVES SOULS"
              description="From 4K wedding films to high-energy event coverage. We don't just record; we create cinema."
              theme="orange"
              bgImage={videoHeroImg}
              bgVideo={ringCeremonyVideo}
              bgVideoRotate={-90}
              overlay="bg-gradient-to-r from-black via-black/50 to-transparent"
            />
          </div>
          <div className="min-h-screen w-full" data-type="detail">
            <DetailSection 
              theme="orange"
              title="Visual Narratives"
              description="We approach videography with a filmmaker's eye. Using high-end cinema cameras, drone technology, and professional audio equipment, we weave together the sights and sounds of your event into a compelling story."
              images={randomVideoClipsRef.current.slice(0, 4)}
              allImages={allVideosRef.current}
            />
          </div>
        </div>

        {/* Editing Section (Hero + Detail) */}
        <div ref={editRef} id="editing" className="w-full relative">
          <div className="w-full h-screen-dvh" data-type="hero">
            <Hero 
              id="editing-hero"
              subtitle="Post-Production Suite"
              title="PERFECTION IN EVERY PIXEL"
              description="Advanced AI retouching, color grading, and album design. Where raw footage becomes art."
              theme="purple"
              bgImage={editingHeroImg}
              bgVideo={editingBgVideo}
              overlay="bg-purple-900/30 mix-blend-multiply"
            />
          </div>
          <div className="min-h-screen w-full" data-type="detail">
            <DetailSection 
              theme="purple"
              title="Magic Touch"
              description="Our editing process is where the magic truly happens. We meticulously color grade every frame, remove distractions, and enhance the natural beauty of every shot, ensuring a consistent, high-end look."
              images={[editingImg1, editingImg2, editingImg3, ...(randomPhotoImagesRef.current.slice(4, 5).length ? randomPhotoImagesRef.current.slice(4, 5) : [editingImg1])]}
              allImages={[editingImg1, editingImg2, editingImg3, ...allPhotosRef.current]}
              hidePortfolioButton={true}
            />
          </div>
        </div>
        
        {/* Services Section (2x-height Hero, no image background) */}
        <div ref={servicesRef} id="services" className="w-full relative">
          <div
            className="w-full bg-gunmetal flex flex-col"
            data-type="hero"
            style={{ minHeight: '200dvh' }}
          >
            <Services theme={currentTheme} padding="compact" />
            <WhyChooseUs />
          </div>
          <div className="w-full bg-carbon">
            <Footer />
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;