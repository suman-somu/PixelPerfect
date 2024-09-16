const sharp = require('sharp');

async function applyOperations(image, operations) {
  let modulateOptions = {};

  if (operations.brightness !== undefined) {
    modulateOptions.brightness = parseFloat(operations.brightness) / 100;
  }

  if (operations.saturation !== undefined) {
    modulateOptions.saturation = parseFloat(operations.saturation) / 100;
  }

  if (Object.keys(modulateOptions).length > 0) {
    image = image.modulate(modulateOptions);
  }

  if (operations.contrast !== undefined) {
    const contrastMultiplier = (parseFloat(operations.contrast) + 100) / 100;
    image = image.linear(contrastMultiplier, -(128 * contrastMultiplier) + 128);
  }

  if (operations.rotate !== undefined) {
    image = image.rotate(parseInt(operations.rotate));
  }

  return image;
}

async function createPreview(filePath, operations) {
  let image = sharp(filePath).resize(300); // Resize for preview
  image = await applyOperations(image, operations);
  return await image.jpeg({ quality: 60 }).toBuffer();
}

async function processImage(filePath, operations, format) {
  let image = sharp(filePath);
  image = await applyOperations(image, operations);
  
  if (format === 'png') {
    return await image.png().toBuffer();
  } else {
    return await image.jpeg({ quality: 90 }).toBuffer();
  }
}

module.exports = { processImage, createPreview };