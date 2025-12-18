# 🚀 Cloudinary Setup Guide

## Step 1: Get Your Credentials

1. Go to: https://console.cloudinary.com/settings
2. Click on **"Account"** in the left sidebar
3. Under **"API Keys"** section, you'll see:
   - **Cloud Name** (e.g., "dstf2qeg9")
   - **API Key** (numbers like "123456789012345")
   - **API Secret** (click "reveal" to see it)

## Step 2: Add Credentials

1. Open the file: `.env.cloudinary`
2. Replace the placeholders with your actual values:

```
CLOUDINARY_CLOUD_NAME=dstf2qeg9
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your_secret_here
```

**⚠️ Important:** This file is in .gitignore - it won't be committed to GitHub

## Step 3: Upload Your Files

Run this command:

```bash
node upload-to-cloudinary.js
```

This will:
- Upload all photos from `data/Landscape/photo`
- Upload all videos from `data/Landscape/videos`
- Upload all photos from `data/Potrate/photo`
- Upload all videos from `data/Potrate/videos`
- Upload logos from `data/logo`
- Save all URLs to `cloudinary-urls.json`

**Time:** ~5-10 minutes depending on file sizes

## Step 4: Update Your Project

Run this command:

```bash
node update-assets.js
```

This will automatically update `data/external-assets.ts` with all the Cloudinary URLs.

## Step 5: Switch to External Mode

1. Open `data/assets.ts`
2. Find line 7 (should say `const ASSET_SOURCE: 'local' | 'external' = 'local';`)
3. Change it to:

```typescript
const ASSET_SOURCE: 'local' | 'external' = 'external';
```

## Step 6: Test Your Site

```bash
npm run dev
```

Visit http://localhost:3000 and verify all images/videos load from Cloudinary!

---

## ✅ Benefits You Just Got:

- ⚡ **Fast loading** - CDN delivers from nearest server
- 🌍 **Global** - Fast anywhere in the world
- 📱 **Optimized** - Automatic format conversion (WebP)
- 🔒 **Secure** - Your files are safe on Cloudinary
- 💾 **Free** - 25GB storage on free tier

---

## 🔍 Verify Upload

After uploading, check your Cloudinary dashboard:
https://console.cloudinary.com/console/media_library

You should see folders:
- landscape/photos
- landscape/videos
- portrait/photos
- portrait/videos
- editing
- logos

---

## ⚠️ Troubleshooting

**"Error: Cloudinary credentials not found"**
→ Check `.env.cloudinary` has correct values with no quotes

**"Upload failed" errors**
→ Check your internet connection
→ Verify API credentials are correct

**"File not found" warnings**
→ Normal if some folders are empty
→ Only affects missing folders

**Images don't load on site**
→ Make sure you changed `ASSET_SOURCE` to `'external'` in `data/assets.ts`
→ Check browser console for errors

---

## 📊 Monitor Usage

Check your usage anytime:
https://console.cloudinary.com/settings/billing/plans

You're using: **5GB of 25GB** (20%) ✅

---

## 🎉 You're Done!

Your photos and videos are now hosted on Cloudinary's global CDN!

**Next:** Deploy your site to Vercel/Netlify and it will automatically use Cloudinary.
