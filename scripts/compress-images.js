const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const GALLERY_DIR = path.join(__dirname, '../app/public/gallery');
const MAX_SIZE_KB = 400; // Target max 400KB
const QUALITY = 80; // WebP quality

async function compressImage(filePath) {
  const stats = fs.statSync(filePath);
  const sizeKB = stats.size / 1024;

  if (sizeKB <= MAX_SIZE_KB) {
    console.log(`✓ ${path.basename(filePath)} is already optimized (${sizeKB.toFixed(0)}KB)`);
    return;
  }

  console.log(`⚙ Compressing ${path.basename(filePath)} (${sizeKB.toFixed(0)}KB)...`);

  const tempPath = filePath + '.tmp';

  await sharp(filePath)
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(tempPath);

  const newStats = fs.statSync(tempPath);
  const newSizeKB = newStats.size / 1024;

  // If still too large, reduce quality further
  if (newSizeKB > MAX_SIZE_KB) {
    const reducedQuality = Math.floor(QUALITY * (MAX_SIZE_KB / newSizeKB));
    console.log(`  Reducing quality to ${reducedQuality}...`);

    await sharp(filePath)
      .webp({ quality: reducedQuality, effort: 6 })
      .toFile(tempPath);
  }

  // Replace original
  fs.renameSync(tempPath, filePath);

  const finalStats = fs.statSync(filePath);
  const finalSizeKB = finalStats.size / 1024;
  const saved = ((sizeKB - finalSizeKB) / sizeKB * 100).toFixed(1);

  console.log(`✓ ${path.basename(filePath)}: ${sizeKB.toFixed(0)}KB → ${finalSizeKB.toFixed(0)}KB (saved ${saved}%)`);
}

async function compressAllImages() {
  const files = fs.readdirSync(GALLERY_DIR)
    .filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.png'));

  console.log(`Found ${files.length} images to check\n`);

  for (const file of files) {
    const filePath = path.join(GALLERY_DIR, file);
    try {
      await compressImage(filePath);
    } catch (err) {
      console.error(`✗ Error compressing ${file}:`, err.message);
    }
  }

  console.log('\n✓ Image compression complete!');
}

compressAllImages().catch(console.error);
