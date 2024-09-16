# Image Processing Application

This project is an image processing application that allows users to upload images, apply various transformations, and download the processed images. The application consists of a backend server built with Node.js and Express, and a frontend client built with React.

## Project Structure
```.
├── .gitignore
├── backend/
│ ├── package.json
│ ├── src/
│ │ ├── imageProcessor.js
│ │ └── index.js
│ └── uploads/
├── frontend/
│ ├── package.json
│ ├── public/
│ │ ├── index.html
│ │ ├── manifest.json
│ │ └── robots.txt
│ ├── README.md
│ ├── src/
│ │ ├── App.css
│ │ ├── App.test.tsx
│ │ ├── App.tsx
│ │ ├── ImageContext.tsx
│ │ ├── ImageProcessor.css
│ │ ├── ImageProcessor.tsx
│ │ ├── index.css
│ │ ├── index.tsx
│ │ ├── react-app-env.d.ts
│ │ ├── reportWebVitals.ts
│ │ └── setupTests.ts
│ └── tsconfig.json
```


## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

### Backend

1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install the dependencies:
    ```
    npm install
    ```
3. Start the backend server:
   ```
   npm start
   ```
The backend server will run on http://localhost:3001.

### Frontend

1.  Open a new terminal and navigate to the frontend directory:
    ```
    cd frontend
    ```
2. Install the dependencies:
    ```
    npm install
    ```
3. Start the frontend development server:
    ```
    npm start
    ```
The frontend application will run on http://localhost:3000.

### Usage
    Open your browser and navigate to http://localhost:3000.

    Upload an image using the provided interface.

    Apply the desired transformations (e.g., brightness, contrast, rotation).

    Preview the changes and download the processed image.

###  Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License
This project is licensed under the MIT License.