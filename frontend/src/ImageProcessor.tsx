import React, { useState, useEffect } from 'react';
import { useImage } from './ImageContext';
import './ImageProcessor.css'; 

const ImageProcessor: React.FC = () => {
  const { image, setImage } = useImage();
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [originalFilePath, setOriginalFilePath] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [format, setFormat] = useState<'jpeg' | 'png'>('jpeg');

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('http://localhost:3001/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        setOriginalFilePath(data.filePath);
        setImage(URL.createObjectURL(file));
      } catch (error) {
        console.error('Upload error:', error);
        alert('Failed to upload image');
      }
    }
  };

  const generatePreview = async () => {
    if (!originalFilePath) return;

    try {
      const response = await fetch('http://localhost:3001/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filePath: originalFilePath,
          operations: { brightness, contrast, saturation, rotate: rotation },
        }),
      });

      if (!response.ok) {
        throw new Error('Preview generation failed');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setPreviewUrl(imageUrl);
    } catch (error) {
      console.error('Preview error:', error);
    }
  };

  useEffect(() => {
    generatePreview();
  }, [brightness, contrast, saturation, rotation, originalFilePath]);

  const downloadImage = async () => {
    if (!originalFilePath) return;

    try {
      const response = await fetch('http://localhost:3001/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filePath: originalFilePath,
          operations: { brightness, contrast, saturation, rotate: rotation },
          format,
        }),
      });

      if (!response.ok) {
        throw new Error('Processing failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `processed-image.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download image');
    }
  };

  return (
    <div className="image-processor">
      <h1>Image Processor</h1>
      <div className="upload-section">
        <label htmlFor="file-upload" className="custom-file-upload">
          Choose an image
        </label>
        <input id="file-upload" type="file" onChange={handleUpload} accept="image/*" />
      </div>
      {previewUrl && (
        <div className="editor-container">
          <div className="preview-container">
            <img src={previewUrl} alt="Preview" className="preview-image" />
          </div>
          <div className="controls-container">
            <div className="control-group">
              <label>Brightness: {brightness}%</label>
              <input
                type="range"
                min="0"
                max="200"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
              />
            </div>
            <div className="control-group">
              <label>Contrast: {contrast}</label>
              <input
                type="range"
                min="-100"
                max="100"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
              />
            </div>
            <div className="control-group">
              <label>Saturation: {saturation}%</label>
              <input
                type="range"
                min="0"
                max="200"
                value={saturation}
                onChange={(e) => setSaturation(Number(e.target.value))}
              />
            </div>
            <div className="control-group">
              <label>Rotation: {rotation}°</label>
              <input
                type="range"
                min="0"
                max="360"
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
              />
            </div>
            <div className="control-group">
              <label>Format: </label>
              <select value={format} onChange={(e) => setFormat(e.target.value as 'jpeg' | 'png')}>
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
              </select>
            </div>
            <button className="download-button" onClick={downloadImage}>Download Processed Image</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageProcessor;