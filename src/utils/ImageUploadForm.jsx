import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../redux/authSlice';
import { storage } from '../firebase/Firebase'; 
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setPosts, setError } from '../redux/postsSlice';

const ImageUploadForm = () => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (image) {
      try {
        setUploading(true);
        const storageRef = ref(storage, `images/${currentUser.userId}/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error('Error uploading image:', error);
            setUploading(false);
            dispatch(setError('Error uploading image'));
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('File available at', downloadURL);
              setUploading(false);
              dispatch(setPosts(downloadURL)); 
            } catch (error) {
              console.error('Error getting download URL:', error);
              setUploading(false);
              dispatch(setError('Error getting download URL'));
            }
          }
        );
      } catch (error) {
        console.error('Error uploading image:', error);
        setUploading(false);
        dispatch(setError('Error uploading image'));
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-6">
        <label className="block text-sm font-medium text-gray-700">Choose an image</label>
        <input type="file" onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div className="px-4 pb-4">
        {uploading ? (
          <div>
            <p>Uploading...</p>
            <progress className="w-full mt-2" value={uploadProgress} max="100"></progress>
          </div>
        ) : (
          <button onClick={handleUpload} className="w-full py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700">Upload</button>
        )}
      </div>
    </div>
  );
};

export default ImageUploadForm;
