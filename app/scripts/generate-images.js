const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const SRC_DIR = path.resolve(__dirname, '../public/gallery-src'); // Put original masters here
const OUT_DIR = path.resolve(__dirname, '../public/gallery');
const widths = [320, 640, 960, 1280, 1920];
const webpQuality = 80;
const avifQuality = 60;

if (!fs.existsSync(SRC_DIR)) {
  console.error('Source directory does not exist:', SRC_DIR);
  process.exit(1);
}

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const files = fs.readdirSync(SRC_DIR).filter(f => /\.(jpe?g|png|webp|tiff)$/i.test(f));

(async () => {
  console.log('Generating images for', files.length, 'files');
  for (const file of files) {
    const name = path.parse(file).name;
    const input = path.join(SRC_DIR, file);

    for (const w of widths) {
      const outWebp = path.join(OUT_DIR, `${name}-${w}.webp`);
      const outAvif = path.join(OUT_DIR, `${name}-${w}.avif`);

      try {
        await sharp(input)
          .resize({ width: w })
          .webp({ quality: webpQuality })
          .toFile(outWebp);

        await sharp(input)
          .resize({ width: w })
          .avif({ quality: avifQuality })
          .toFile(outAvif);

        console.log(`Generated ${name} @ ${w}px`);
      } catch (err) {
        console.error('Failed to generate for', input, 'width', w, err);
      }
    }

    // also copy a reasonable default fallback (e.g., middle width)
    const fallbackW = widths[Math.floor(widths.length / 2)];
    const fallbackSrc = path.join(OUT_DIR, `${name}-${fallbackW}.webp`);
    const fallbackDest = path.join(OUT_DIR, `${name}.webp`);
    if (fs.existsSync(fallbackSrc)) {
      try {
        fs.copyFileSync(fallbackSrc, fallbackDest);
      } catch (err) {
        console.warn('copyFileSync failed, attempting manual copy for', fallbackSrc, '->', fallbackDest, err && err.code ? err.code : err);
        try {
          const data = fs.readFileSync(fallbackSrc);
          fs.writeFileSync(fallbackDest, data);
          console.log('Manual copy succeeded for', fallbackDest);
        } catch (err2) {
          console.error('Failed to create fallback file for', name, err2);
        }
      }
    }
  }

  console.log('Image generation complete.');
})();
