import { useState } from "react";
import { storage, firestore } from "../firebase/Firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";

const useCreatePost = (onClose) => {
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const authUser = useSelector(selectUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (selectedImage) {
        const storageRef = ref(storage, `posts/${authUser.uid}/${Date.now()}`);
        await uploadString(storageRef, selectedImage, "data_url");
        imageUrl = await getDownloadURL(storageRef);
      }

      const postDocRef = doc(firestore, "posts", Date.now().toString());
      await setDoc(postDocRef, {
        caption,
        imageUrl,
        timestamp: new Date(),
      });

      setCaption("");
      setSelectedImage(null);
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (file && file.type.startsWith("image/")) {
      if (file.size > maxSize) {
        console.error("Image size is greater than 2 MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return { caption, selectedImage, setCaption, handleImageChange, handleSubmit };
};

export default useCreatePost;
