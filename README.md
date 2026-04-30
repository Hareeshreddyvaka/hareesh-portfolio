# Hareesh Reddy Vaka - 3D Cinematic Portfolio

A highly immersive, scroll-driven 3D web portfolio built with React, Three.js, React Three Fiber, and GSAP. Designed to showcase my expertise in AI/ML Engineering through a cinematic space journey, inspired by the top 1% of creative web design.

## 🚀 Features

- **Cinematic Scroll Journey**: Uses GSAP ScrollTrigger and Lenis smooth scrolling to drive a 3D camera through an expansive, procedurally generated planetary system.
- **Interactive Planetary System**: Detailed 3D planets (Earth, Mars, Venus, Saturn, Jupiter) with custom shaders, atmospheric scattering, and interactive rings.
- **Glassmorphic UI**: High-end DOM overlays that fade in dynamically based on scroll progress, perfectly synchronized with the 3D flight path.
- **Procedural Environments**: Optimized generative starfields, nebula clouds, and asteroid belts that run smoothly at 60 FPS.
- **Performance Optimized**: Implements intelligent GPU chunking, multi-stage asset preloading, and dynamic effect scaling (Bloom, Vignette) based on user preferences.
- **Immersive Audio & Controls**: Includes a boot sequence, keyboard shortcuts (press `?`), and a Photo Mode for free-roaming exploration.

## 🛠️ Technology Stack

- **Framework**: React 18 with Vite
- **3D Rendering**: Three.js, React Three Fiber (R3F), Drei
- **Animation**: GSAP (ScrollTrigger), Framer Motion
- **Scroll Orchestration**: Lenis
- **Styling**: Tailwind CSS (Vanilla CSS structure with utility classes)
- **Icons**: Lucide React

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Hareeshreddyvaka/hareesh-portfolio.git
   cd hareesh-portfolio-1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🌌 Project Structure

- `/src/components/space`: Core 3D engine, shaders, planets, and cinematic sequencing.
- `/src/components/sections`: The scroll-triggered DOM overlays (Hero, Projects, Skills, Contact).
- `/src/animations`: GSAP timeline configurations and camera bezier path routing.
- `/src/hooks`: Global state management for camera modes, scroll orchestration, and user preferences.
- `/public`: Static assets, textures, and the `portfolio.json` data configuration file.

## 🎨 Design Philosophy

This project rejects standard web design templates. It leverages a dark-mode first, highly interactive environment where the user feels they are exploring a deep-space documentary rather than reading a resume. 

Performance is strictly prioritized: heavy effects like MSAA and volumetric lighting are dynamically managed, and the rendering loop avoids frame-by-frame garbage collection spikes.

---
*Built by Vaka Hareesh Reddy.*
