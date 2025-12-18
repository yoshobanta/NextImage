/// <reference types="vite/client" />
// Centralized asset exports for logos, photos, and videos.
// Supports both local files (for development) and external CDN/cloud storage (for production)

// ========== CONFIGURATION ==========
// Set to 'local' for development with local files
// Set to 'external' for production with cloud-hosted files
const ASSET_SOURCE: 'local' | 'external' = 'external';

// Import external configuration if using external hosting
import { externalAssets } from './external-assets';

// ========== LOCAL ASSETS (Development) ==========
// Explicit logo imports (stable, few files)
let fullLogo: string = '';
let fullLogoBlack: string = '';
let shortLogo: string = '';
let pngBlack: string = '';
let photographyPrimaryHero: string = '';

// Only import local files if they exist (when ASSET_SOURCE is 'local')
if (ASSET_SOURCE === 'local') {
  try {
    const logoModules = import.meta.glob('./logo/*.{png,jpg,jpeg,webp}', { 
      eager: true, 
      import: 'default' 
    });
    const logoValues = Object.values(logoModules) as string[];
    fullLogo = logoValues[0] || '';
    fullLogoBlack = logoValues[1] || '';
    shortLogo = logoValues[2] || '';
    pngBlack = logoValues[3] || '';
  } catch (e) {
    console.warn('Local logo files not found');
  }
}

export const logos = ASSET_SOURCE === 'external' ? {
  full: externalAssets.logos.fullLogo || '',
  fullBlack: externalAssets.logos.fullLogoBlack || '',
  short: externalAssets.logos.shortLogo || '',
  altBlack: externalAssets.logos.favicon || '',
} : {
  full: fullLogo,
  fullBlack: fullLogoBlack,
  short: shortLogo,
  altBlack: pngBlack,
};
export type LogoKey = keyof typeof logos;

// ========== PHOTOS ==========
let localPhotos: string[] = [];
if (ASSET_SOURCE === 'local') {
  const photoModules = import.meta.glob('./Potrate/photo/*.{webp,jpg,jpeg,png}', {
    eager: true,
    import: 'default'
  });
  const landscapePhotoModules = import.meta.glob('./Landscape/photo/*.{webp,jpg,jpeg,png}', {
    eager: true,
    import: 'default'
  });
  localPhotos = [...Object.values(photoModules), ...Object.values(landscapePhotoModules)] as string[];
}

export const photos: string[] = ASSET_SOURCE === 'external' 
  ? [...externalAssets.portrait.photos, ...externalAssets.landscape.photos]
  : localPhotos;

// ========== VIDEOS ==========
let localVideos: string[] = [];
if (ASSET_SOURCE === 'local') {
  const videoModules = import.meta.glob('./Potrate/videos/*.mp4', {
    eager: true,
    import: 'default'
  });
  const landscapeVideoModules = import.meta.glob('./Landscape/videos/*.mp4', {
    eager: true,
    import: 'default'
  });
  localVideos = [...Object.values(videoModules), ...Object.values(landscapeVideoModules)] as string[];
}

export const videos: string[] = ASSET_SOURCE === 'external'
  ? [...externalAssets.portrait.videos, ...externalAssets.landscape.videos]
  : localVideos;

// Helper accessors (optional)
export const getLogo = (key: LogoKey): string => logos[key];
export const allLogos = (): string[] => Object.values(logos);

// Pre-selected hero images (stable identifiers for sections)
export const heroImages = {
  photography: ASSET_SOURCE === 'external' 
    ? (externalAssets.landscape.photos[0] || photos[0] || '')
    : (photographyPrimaryHero || photos[0] || ''),
  videography: photos[1] || photos[0] || '',
  editing: photos[2] || photos[0] || '',
  services: photos[3] || photos[0] || ''
} as const;
export type HeroImageKey = keyof typeof heroImages;
export const getHeroImage = (key: HeroImageKey): string => heroImages[key];

// Example structured export if future metadata is desired
// interface MediaAsset { url: string; type: 'photo' | 'video'; }
// export const mediaLibrary: MediaAsset[] = [
//   ...photos.map(p => ({ url: p, type: 'photo' })),
//   ...videos.map(v => ({ url: v, type: 'video' }))
// ];
