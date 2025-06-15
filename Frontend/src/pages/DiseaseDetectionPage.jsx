import React, { useState } from "react";
import ContainerBox from "../components/ContainerBox";
import { Button } from "../components/ui/Button";
import axios from "axios";

function DiseaseDetectionPage() {
  const [previewSrc, setPreviewSrc] = useState("../../public/DetectionPageImg.jpg");
  const [isImageChange, setIsImageChange] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [solutionData, setSolutionData] = useState({}); // 🆕 added

  const getSolution = async (diseaseAndCropName) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/report/disease-solution",
        { diseaseAndCropName }
      );

      setSolutionData(response.data.cleanResponse); // 🆕 store response
      return response.data.cleanResponse;
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };

  const sendPhotoToServer = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v2/detect_disease",
        { method: "POST", body: formData }
      );
      if (!response.ok) throw new Error("Failed to Fetch");
      const diseaseData = await response.json();
      console.log("Server response:", diseaseData.Predictions);
      const solution = await getSolution(diseaseData.Predictions);

      console.log("Solution: ", solution);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewSrc(imageUrl);
      setIsImageChange(true);
      setImageFile(file);
    }
  };

  return (
    <div className="px-5 my-6 max-w-[1200px] mx-auto">
      <ContainerBox customCSS={"px-10"}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Detect Plant Disease</h1>
          <p className="text-gray-800">
            Detect the plant disease by uploading an image of the affected
            plant.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center space-y-4">
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
            className="block text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-green-100 file:text-green-700
              hover:file:bg-green-200
              max-w-sm"
            onChange={handleImageChange}
          />

          <p className="text-white text-sm">
            Supported formats: JPG, PNG • Max size: 5MB
          </p>
        </div>

        {isImageChange && (
          <Button
            onClick={() => sendPhotoToServer(imageFile)}
            className="mt-4 w-40 mx-auto"
          >
            Detect Disease
          </Button>
        )}

        {Object.keys(solutionData).length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-green-800 text-center">
              Possible Detected Diseases & Solutions
            </h2>

            <div className="grid gap-6">
              {Object.entries(solutionData).map(
                ([diseaseName, { solution }], index) => {
                  const [crop, disease] = diseaseName.split("___");

                  return (
                    <div
                      key={index}
                      className="border border-green-300 p-4 rounded-lg shadow-md bg-green-50"
                    >
                      <h3 className="text-xl font-bold text-green-700">
                        🌿 {crop.replace(/_/g, " ")}
                      </h3>
                      <p className="text-md italic text-gray-600 mb-2">
                        Disease: {disease.replace(/_/g, " ")}
                      </p>
                      <p className="text-gray-800">{solution}</p>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </ContainerBox>
    </div>
  );
}

export default DiseaseDetectionPage;
