import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('public/assets/screen_shots');

const files = fs.readdirSync(SCREENSHOT_DIR).filter(f => f.endsWith('.jpeg') || f.endsWith('.png'));

console.log('Processing screenshots in:', SCREENSHOT_DIR, files);

for (const file of files) {
  const filePath = path.join(SCREENSHOT_DIR, file);
  const image = sharp(filePath);
  const metadata = await image.metadata();

  const { data, info } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  const len = data.length;

  for (let i = 0; i < len; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Compute luminance
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    // If pixel is dark background (greyish blacks up to ~55)
    if (lum < 52) {
      // Deep black crush
      // Non-linear crush curve: 0 to 52 maps to 0 to 8
      const factor = Math.pow(lum / 52, 2.2);
      data[i] = Math.round(r * factor * 0.25);
      data[i + 1] = Math.round(g * factor * 0.25);
      data[i + 2] = Math.round(b * factor * 0.25);
    } else if (lum < 90) {
      // Smooth roll-off to avoid hard edge
      const t = (lum - 52) / (90 - 52);
      const factor = 0.35 + 0.65 * t;
      data[i] = Math.round(r * factor);
      data[i + 1] = Math.round(g * factor);
      data[i + 2] = Math.round(b * factor);
    } else {
      // Midtones and highlights: boost contrast slightly for vibrant HD pop
      // Preserve and subtly saturate orange and white
      data[i] = Math.min(255, Math.round(r * 1.05));
      data[i + 1] = Math.min(255, Math.round(g * 1.03));
      data[i + 2] = Math.min(255, Math.round(b * 1.02));
    }
  }

  // Save back as high-quality JPEG
  const tempPath = path.join(SCREENSHOT_DIR, 'proc_' + file);
  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    }
  })
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile(tempPath);

  fs.copyFileSync(tempPath, filePath);
  fs.unlinkSync(tempPath);

  console.log(`Successfully enhanced ${file}: True inky black applied.`);
}

console.log('All screenshots enhanced to OLED True Black!');
