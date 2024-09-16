const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { processImage, createPreview } = require('./imageProcessor');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ filePath: req.file.path });
});

app.post('/preview', async (req, res) => {
  const { filePath, operations } = req.body;
  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    console.log('Generating preview:', filePath);
    console.log('Operations:', operations);
    const previewBuffer = await createPreview(filePath, operations);
    res.contentType('image/jpeg').send(previewBuffer);
  } catch (error) {
    console.error('Preview generation error:', error);
    res.status(500).json({ error: 'Preview generation failed', details: error.message });
  }
});

app.post('/process', async (req, res) => {
  const { filePath, operations, format } = req.body;
  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    console.log('Processing image:', filePath);
    console.log('Operations:', operations);
    console.log('Format:', format);
    const processedImageBuffer = await processImage(filePath, operations, format);
    res.contentType(`image/${format}`).send(processedImageBuffer);
  } catch (error) {
    console.error('Image processing error:', error);
    res.status(500).json({ error: 'Image processing failed', details: error.message });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});