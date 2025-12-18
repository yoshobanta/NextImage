# Data Directory

## Privacy Notice

This repository contains the source code for our photography portfolio website. For client privacy and professional reasons, actual client photos and videos are **not included** in this public repository.

## Data Structure

The application expects the following directory structure:

```
data/
├── Landscape/
│   ├── photo/          # Landscape photography
│   └── videos/         # Landscape videography
├── Potrate/
│   ├── photo/          # Portrait photography
│   └── videos/         # Portrait videography
├── Editing/            # Photo/video editing samples
├── Main/               # Main/featured content
├── logo/               # Brand logos and assets
└── assets.ts           # Asset loader configuration
```

## For Development

To run this project with your own media:

1. Create the directory structure above
2. Add your photos (`.jpg`, `.png`, `.webp`) and videos (`.mp4`) to the respective folders
3. The application will automatically detect and load them using Vite's glob imports

## Demo Content

For demonstration purposes, you can use royalty-free images from:
- [Unsplash](https://unsplash.com/)
- [Pexels](https://pexels.com/)
- [Pixabay](https://pixabay.com/)

**Note:** All actual client work is hosted privately and securely.
