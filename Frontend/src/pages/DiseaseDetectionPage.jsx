import React, { useState } from 'react';
import ContainerBox from '../components/ContainerBox';
import { Button } from '../components/ui/Button';
import axios from 'axios';

function DiseaseDetectionPage() {
  const [previewSrc, setPreviewSrc] = useState('DetectionPageImg.jpg');
  const [isImageChange, setIsImageChange] = useState(false);

  const sendPhotoToServer = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v2/detect_disease', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewSrc(imageUrl);
      setIsImageChange(true);
    }
  };

  return (
    <div className="px-5">
      <ContainerBox customCSS={"px-10"}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Detect Plant Disease</h1>
          <p className="text-gray-800">
            Detect the plant disease by uploading an image of the affected plant.
          </p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <img
            src={previewSrc}
            alt="Plant Disease Detection"
            className="w-55 h-56 rounded-2xl object-cover mb-4"
          />

          <label className="text-lg font-medium">Upload or Take a Photo</label>

          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="block w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-green-100 file:text-green-700
              hover:file:bg-green-200
              max-w-sm"
            onChange={handleImageChange}
          />

          <p className="text-gray-500 text-sm">
            Supported formats: JPG, PNG • Max size: 5MB
          </p>
        </div>

        {isImageChange && ( <Button onClick={() => sendPhotoToServer(previewSrc)} className="mt-4 w-40 mx-auto">Detect Disease</Button>)}
      </ContainerBox>
    </div>
  );
}

export default DiseaseDetectionPage;
