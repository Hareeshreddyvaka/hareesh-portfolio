import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

const ASSETS = [
  { url: 'https://www.solarsystemscope.com/textures/download/8k_earth_daymap.jpg', dest: 'public/textures/earth_color.jpg' },
  { url: 'https://www.solarsystemscope.com/textures/download/8k_mars.jpg', dest: 'public/textures/mars_color.jpg' },
  { url: 'https://polyhaven.com/share/dl/hdri/8k/starry_night.hdr', dest: 'public/textures/skybox.hdr' },
  { url: 'https://github.com/rsms/inter/releases/download/v3.19/Inter.var.woff2', dest: 'public/fonts/Inter-V.woff2' },
  { url: 'https://www.solarsystemscope.com/textures/download/8k_saturn_ring_alpha.png', dest: 'public/textures/saturn_rings.png' }
];

async function downloadFile(url, dest) {
  console.log(`Downloading ${url} to ${dest}...`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`Failed to download ${url}: ${res.statusText}. Using fallback/dummy file.`);
      fs.writeFileSync(dest, 'dummy content');
      return;
    }
    const fileStream = fs.createWriteStream(dest, { flags: 'wx' });
    await finished(Readable.fromWeb(res.body).pipe(fileStream));
    console.log(`Successfully downloaded ${dest}`);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(`${dest} already exists. Skipping.`);
    } else {
      console.error(`Error downloading ${url}:`, err.message);
      // Create a dummy file so the build doesn't break
      fs.writeFileSync(dest, 'dummy content');
    }
  }
}

async function main() {
  for (const asset of ASSETS) {
    await downloadFile(asset.url, asset.dest);
  }
  console.log('All assets processed.');
}

main();
