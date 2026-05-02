import sharp from 'sharp'
import { readdir } from 'fs/promises'
import { join, parse } from 'path'

async function convert(dir) {
  const files = await readdir(dir)
  for (const file of files) {
    const { name, ext } = parse(file)
    if (!['.jpg','.jpeg','.png'].includes(ext.toLowerCase())) continue
    const src = join(dir, file)

    await sharp(src)
      .webp({ quality: 85 })
      .toFile(join(dir, name + '.webp'))
    console.log('Full WebP:', name + '.webp')

    await sharp(src)
      .resize(512)
      .webp({ quality: 80 })
      .toFile(join(dir, name + '-512.webp'))
    console.log('LOD 512px:', name + '-512.webp')
  }
}

await convert('public/assets/textures/planets')
await convert('public/assets/textures/skybox')
console.log('All textures converted.')
