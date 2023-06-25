import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileDrop = (droppedFiles) => {
    if (droppedFiles.length > 0) {
      setSelectedFile(droppedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileDrop,
  });

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('http://localhost:4000/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('File uploaded successfully:', data);
          // Handle the response as needed
        })
        .catch((error) => {
          console.error('File upload failed:', error);
          // Handle any errors
        });
    }
  };

  return (
    <div>
      <div className={`dropzone ${isDragActive ? 'active' : ''}`} {...getRootProps()}>
        <input {...getInputProps()} />

        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag and drop files here, or click to select files</p>
        )}
      </div>

      {selectedFile && (
        <div>
          <h4>Selected File:</h4>
          <p>{selectedFile.name}</p>
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
