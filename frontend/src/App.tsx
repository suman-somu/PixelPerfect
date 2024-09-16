import React from 'react';
import { ImageProvider } from './ImageContext';
import ImageProcessor from './ImageProcessor';

function App() {
  return (
    <ImageProvider>
      <div className="App">
        <ImageProcessor />
      </div>
    </ImageProvider>
  );
}

export default App;