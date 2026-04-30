import sharp from 'sharp';

async function generate() {
  await sharp({
    create: {
      width: 1200, height: 630,
      channels: 3,
      background: { r: 5, g: 5, b: 16 }
    }
  }).jpeg().toFile('public/og-image.jpg');
  console.log('og-image.jpg created successfully');
}

generate();
