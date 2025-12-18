# Data Directory

## Privacy Notice

This directory contains configuration files for the asset management system. For client privacy and confidentiality, actual media files (photos and videos) are hosted on a secure CDN and are **not included** in this repository.

## Contents

- `assets.ts` - Asset loader configuration with local/external source switching
- `external-assets.ts` - CDN URL configuration for production deployment

## Note for Developers

This project uses Cloudinary CDN for media hosting in production. The asset configuration automatically loads media from the CDN when deployed. For local development with custom media, contact the project maintainers.
3. The application will automatically detect and load them using Vite's glob imports

## Demo Content

For demonstration purposes, you can use royalty-free images from:
- [Unsplash](https://unsplash.com/)
- [Pexels](https://pexels.com/)
- [Pixabay](https://pixabay.com/)

**Note:** All actual client work is hosted privately and securely.
