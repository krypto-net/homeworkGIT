const fs = require('fs');
const path = require('path');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

class VisualRegressionHelper {
  constructor() {
    this.baseDir = path.join(__dirname, '..', 'screenshots');
    this.baselineDir = path.join(this.baseDir, 'baseline');
    this.currentDir = path.join(this.baseDir, 'current');
    this.diffDir = path.join(this.baseDir, 'diff');

    [this.baselineDir, this.currentDir, this.diffDir].forEach((dir) => {
      fs.mkdirSync(dir, { recursive: true });
    });
  }

  async compareImages(imageName, threshold = 0.1) {
    const baselinePath = path.join(this.baselineDir, imageName);
    const currentPath = path.join(this.currentDir, imageName);
    const diffPath = path.join(this.diffDir, imageName);

    if (!fs.existsSync(baselinePath)) {
      fs.copyFileSync(currentPath, baselinePath);
      return { hasBaseline: false, match: true, diffPixels: 0, matchPercentage: '0.00' };
    }

    const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
    const current = PNG.sync.read(fs.readFileSync(currentPath));
    const { width, height } = baseline;
    const diff = new PNG({ width, height });

    const diffPixels = pixelmatch(
      baseline.data,
      current.data,
      diff.data,
      width,
      height,
      { threshold }
    );

    fs.writeFileSync(diffPath, PNG.sync.write(diff));

    const totalPixels = width * height;
    const matchPercentage = ((diffPixels / totalPixels) * 100).toFixed(2);
    const match = diffPixels === 0;

    return { hasBaseline: true, match, diffPixels, matchPercentage };
  }
}

module.exports = VisualRegressionHelper;
