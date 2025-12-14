<div align="center">
  <h1>Next Image - Lipu Photography</h1>
  <p><strong>Premium Photography Portfolio & Booking Platform</strong></p>
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#installation">Installation</a> •
    <a href="#deployment">Deployment</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## 📖 About

**Next Image - Lipu Photography** is a modern, high-performance web application designed to showcase professional photography, videography, and editing services. Built with cutting-edge web technologies, this portfolio features dynamic theming, smooth scroll-based animations, and an immersive user experience optimized for all devices.

Perfect for photographers, videographers, and creative studios looking to establish a strong online presence.

---

## ✨ Features

### 🎨 **Visual Experience**
- **Full-Screen Hero Sections** - Cinematic backgrounds with support for both images and videos
- **Dynamic Theme System** - Smooth color transitions as you scroll (Teal → Orange → Purple → White)
- **Scroll-Based Animations** - Intersection Observer API for buttery-smooth transitions
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop devices

### 🖼️ **Content Management**
- **Dynamic Media Galleries** - Automatically loads and displays photos/videos from local directories
- **Random Media Selection** - Fresh gallery display on each page load
- **Video Background Support** - With rotation support for portrait-mode clips
- **Optimized Asset Loading** - Vite's glob imports for efficient bundling

### 🛠️ **Developer Features**
- **TypeScript** - Full type safety across the entire codebase
- **Component-Based Architecture** - Modular, reusable React components
- **Hot Module Replacement** - Instant feedback during development
- **Production-Ready Build** - Optimized bundle with code splitting

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Modern UI library with concurrent features |
| **TypeScript 5.8** | Type-safe JavaScript development |
| **Vite 6** | Next-generation frontend tooling |
| **Tailwind CSS** | Utility-first CSS framework |
| **Lucide React** | Beautiful, consistent icon library |
| **Intersection Observer API** | Scroll-based animations & theme switching |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v10.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** - [Download here](https://git-scm.com/)

---

## 🚀 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yoshobanta/NextImage.git
cd NextImage
```

### 2️⃣ Install Dependencies

```bash
npm install
```

or if you prefer Yarn:

```bash
yarn install
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

The application will be available at **http://localhost:3000**

---

## 📦 Build for Production

### Create Optimized Build

```bash
npm run build
```

This generates a production-ready build in the `dist/` folder with:
- Minified JavaScript and CSS
- Optimized images and assets
- Tree-shaken dependencies

### Preview Production Build

```bash
npm run preview
```

---

## 📁 Project Structure

```
next-image-lipu-photography/
│
├── components/              # React components
│   ├── Navigation.tsx       # Dynamic themed navigation bar
│   ├── Hero.tsx             # Full-screen hero sections
│   ├── DetailSection.tsx    # Content pages with galleries
│   ├── Services.tsx         # Service offerings grid
│   ├── WhyChooseUs.tsx      # Testimonials and trust section
│   ├── Footer.tsx           # Site footer with social links
│   ├── Logo.tsx             # Responsive logo component
│   └── Roadmap.tsx          # Project roadmap visualization
│
├── data/                    # Media assets
│   ├── Photos/              # Photography collection
│   │   ├── CEO/             # Team photos
│   │   └── editing/         # Editing showcase
│   ├── Video/               # Video clips for sections
│   ├── logo/                # Brand assets
│   └── assets.ts            # Asset loader configuration
│
├── constants.ts             # App-wide constants and data
├── types.ts                 # TypeScript type definitions
├── App.tsx                  # Main application component
├── index.tsx                # Application entry point
├── vite.config.ts           # Vite configuration
└── tsconfig.json            # TypeScript configuration
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration
   - Click **Deploy**

3. **Your site is live!** 🎉

### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy using Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

1. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

2. Build and deploy:
   ```bash
   npm run build
   # Use the included GitHub Actions workflow
   ```

---

## 🎨 Key Sections

### 1. Photography Section (Teal Theme)
- Full-screen hero with dynamic background
- Gallery showcasing wedding and event photography
- Elegant text animations

### 2. Videography Section (Orange Theme)
- Cinematic video backgrounds
- Showcase of highlight reels and documentaries
- Smooth transitions

### 3. Editing Section (Purple Theme)
- Post-production capabilities
- Before/after galleries
- Color grading examples

### 4. Services Section (White Theme)
- Comprehensive service offerings
- Client testimonials
- Team introduction
- Booking call-to-action

---

## 🔧 Configuration

### Customizing Theme Colors

Edit `constants.ts`:

```typescript
export const COLORS = {
  teal: '#2EC4B6',
  orange: '#FF9F1C',
  purple: '#9D4EDD',
  // Add your custom colors here
};
```

### Adding New Services

Edit `constants.ts`:

```typescript
export const SERVICES: ServiceItem[] = [
  {
    id: 'your-service',
    title: 'Your Service',
    description: 'Service description',
    icon: 'camera', // Lucide icon name
    tags: ['Tag1', 'Tag2']
  },
  // ... more services
];
```

### Adding New Photos/Videos

Simply drop your files into:
- `data/Photos/` for images
- `data/Video/` for videos

Vite will automatically detect and bundle them!

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

© 2025 Next Image - Lipu Photography. All rights reserved.

This project is proprietary software. Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited without explicit permission from the copyright holders.

---

## 👥 Authors

**Developed and Maintained by:**

- **Yoshobanta Bisoi** - Lead Developer
  - 📧 Email: [yoshobantabisoi@gmail.com](mailto:yoshobantabisoi@gmail.com)
  - 🔗 GitHub: [@yoshobanta](https://github.com/yoshobanta)

- **Chiranjeeb Das** - Lead Developer
  - 📧 Email: [chiranjeebdas2003@gmail.com](mailto:chiranjeebdas2003@gmail.com)
  - 🔗 GitHub: [@generalduke012](https://github.com/generalduke012)

---

## 📞 Contact & Support

For inquiries, collaborations, or support:

- **General Inquiries**: [yoshobantabisoi@gmail.com](mailto:yoshobantabisoi@gmail.com)
- **Technical Support**: [chiranjeebdas2003@gmail.com](mailto:chiranjeebdas2003@gmail.com)
- **GitHub Issues**: [Report a bug](https://github.com/yoshobanta/NextImage/issues)

---

## 🙏 Acknowledgments

- Photography assets courtesy of Next Image - Lipu Photography
- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)

---

<div align="center">
  <p><strong>Made with ❤️ by Yoshobanta Bisoi & Chiranjeeb Das</strong></p>
  <p>⭐ Star this repo if you find it useful!</p>
</div>