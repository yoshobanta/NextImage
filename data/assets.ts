/// <reference types="vite/client" />
// Centralized asset exports for logos, photos, and videos.
// This leverages Vite's import.meta.glob for scalable bulk importing.

// Explicit logo imports (stable, few files)
import fullLogo from './logo/full_logo.png';
import fullLogoBlack from './logo/full_logo_black.png';
import shortLogo from './logo/short_logo.png';
import pngBlack from './logo/png black.png';
// Explicit hero photo import for photography primary background
import photographyPrimaryHero from './Landscape/photo/2021-06-11.webp';

export const logos = {
  full: fullLogo,
  fullBlack: fullLogoBlack,
  short: shortLogo,
  altBlack: pngBlack,
};
export type LogoKey = keyof typeof logos;

// Bulk photo imports (eager so we get resolved URLs at build time)
// Using a pattern to catch common raster formats; adjust if new types added.
const photoModules = import.meta.glob('./Potrate/photo/*.{webp,jpg,jpeg,png}', {
  eager: true,
  import: 'default'
});
const landscapePhotoModules = import.meta.glob('./Landscape/photo/*.{webp,jpg,jpeg,png}', {
  eager: true,
  import: 'default'
});
export const photos: string[] = [...Object.values(photoModules), ...Object.values(landscapePhotoModules)] as string[];

// Bulk video imports (MP4 collection)
const videoModules = import.meta.glob('./Potrate/videos/*.mp4', {
  eager: true,
  import: 'default'
});
const landscapeVideoModules = import.meta.glob('./Landscape/videos/*.mp4', {
  eager: true,
  import: 'default'
});
export const videos: string[] = [...Object.values(videoModules), ...Object.values(landscapeVideoModules)] as string[];

// Helper accessors (optional)
export const getLogo = (key: LogoKey): string => logos[key];
export const allLogos = (): string[] => Object.values(logos);

// Pre-selected hero images (stable identifiers for sections)
export const heroImages = {
  photography: photographyPrimaryHero, // fixed primary hero image
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
