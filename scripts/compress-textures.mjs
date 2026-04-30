import sharp from 'sharp'
import { readdir } from 'fs/promises'
import { join, parse } from 'path'

const DIR = 'public/assets/textures/planets'
const files = await readdir(DIR)

for (const file of files) {
  const { name, ext } = parse(file)
  if (!['.jpg','.jpeg','.png'].includes(ext.toLowerCase())) continue
  const src = join(DIR, file)

  await sharp(src)
    .webp({ quality: 85 })
    .toFile(join(DIR, name + '.webp'))
  console.log('Full WebP:', name + '.webp')

  await sharp(src)
    .resize(512)
    .webp({ quality: 80 })
    .toFile(join(DIR, name + '-512.webp'))
  console.log('LOD WebP:', name + '-512.webp')
}
