import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/storage";

const UploadImg = ({ parentId, onImageUpload }) => {
  const [imagesSelected, setImagesSelected] = useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImagesSelected(Array.from(files));
    }
  };

  const handleUpload = async () => {
    if (imagesSelected.length === 0) {
      console.log("No images selected.");
      return;
    }

    try {
      const storageRef = firebase.storage().ref();

      const uploadPromises = imagesSelected.map(async (image) => {
        try {
          const uploadedImageUrls = await Promise.all(uploadPromises);
          console.log("Uploaded images:", uploadedImageUrls);

          onImageUpload(uploadedImageUrls);
          setImagesSelected([]);
        } catch (error) {
          console.log("Error uploading image to Firebase", error);
          throw error;
        }
      });

      const uploadedImageUrls = await Promise.all(uploadPromises);
      console.log("Uploaded images:", uploadedImageUrls);
      setImagesSelected([]);
    } catch (error) {
      console.log("Error uploading images to Firebase", error);
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />
      <button onClick={handleUpload}>Upload Images</button>
    </div>
  );
};

export default UploadImg;
