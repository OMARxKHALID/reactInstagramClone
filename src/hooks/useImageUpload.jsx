import { useState } from "react";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { storage, firestore } from "../firebase/Firebase";

export const useImageUpload = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (userId, imageDataUrl) => {
    setUploading(true);
    setError(null);

    try {
      const storageRef = ref(storage, `profilePics/${userId}`);
      await uploadString(storageRef, imageDataUrl, "data_url");
      const url = await getDownloadURL(ref(storage, `profilePics/${userId}`));
      setImageUrl(url);
    } catch (error) {
      console.error("Error uploading image:", error);
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  const updateProfileImage = async (userId) => {
    try {
      const userDocRef = doc(firestore, "users", userId);
      await updateDoc(userDocRef, { profilePicUrl: imageUrl });
    } catch (error) {
      console.error("Error updating profile image URL:", error);
      setError(error.message);
    }
  };

  return { imageUrl, uploading, error, uploadImage, updateProfileImage };
};

