// Update external-assets.ts with Cloudinary URLs
import fs from 'fs';

// Read the cloudinary URLs
const urls = JSON.parse(fs.readFileSync('cloudinary-urls.json', 'utf8'));

// Generate the external-assets.ts content
const content = `// External Asset Configuration - Cloudinary
// Auto-generated from cloudinary-urls.json
// DO NOT EDIT MANUALLY - Run upload-to-cloudinary.js to regenerate

export const getImageUrl = (url: string) => url;
export const getVideoUrl = (url: string) => url;

// ===== LANDSCAPE PHOTOS =====
export const landscapePhotos = [
${urls.landscape.photos.map(url => `  '${url}',`).join('\n')}
].map(getImageUrl);

// ===== LANDSCAPE VIDEOS =====
export const landscapeVideos = [
${urls.landscape.videos.map(url => `  '${url}',`).join('\n')}
].map(getVideoUrl);

// ===== PORTRAIT PHOTOS =====
export const portraitPhotos = [
${urls.portrait.photos.map(url => `  '${url}',`).join('\n')}
].map(getImageUrl);

// ===== PORTRAIT VIDEOS =====
export const portraitVideos = [
${urls.portrait.videos.map(url => `  '${url}',`).join('\n')}
].map(getVideoUrl);

// ===== EDITING SAMPLES =====
export const editingSamples = [
${urls.editing.map(url => `  '${url}',`).join('\n')}
].map(getImageUrl);

// ===== LOGOS =====
export const logos = {
  fullLogo: '${urls.logos.fullLogo || ''}',
  fullLogoBlack: '${urls.logos.fullLogoBlack || ''}',
  shortLogo: '${urls.logos.shortLogo || ''}',
  favicon: '${urls.logos.favicon || ''}',
};

// ===== MAIN/TEAM PHOTOS =====
export const teamPhotos = [
${urls.main.map(url => `  '${url}',`).join('\n')}
].map(getImageUrl);

// Export all assets
export const externalAssets = {
  landscape: {
    photos: landscapePhotos,
    videos: landscapeVideos,
  },
  portrait: {
    photos: portraitPhotos,
    videos: portraitVideos,
  },
  editing: editingSamples,
  logos,
  team: teamPhotos,
};
`;

// Write to external-assets.ts
fs.writeFileSync('data/external-assets.ts', content);

console.log('✅ Updated data/external-assets.ts with Cloudinary URLs!');
console.log('\n📝 Next steps:');
console.log('1. Open data/assets.ts');
console.log('2. Change line 7 to: const ASSET_SOURCE: \'local\' | \'external\' = \'external\';');
console.log('3. Run: npm run dev');
console.log('4. Your site will now use Cloudinary for all media!');
