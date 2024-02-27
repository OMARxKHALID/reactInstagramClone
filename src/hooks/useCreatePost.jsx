import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  setError,
  selectError,
  deleteUserPost,
} from "../redux/userProfileSlice";
import { storage, firestore } from "../firebase/Firebase";
import { ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { selectUser } from "../redux/authSlice";
import { deletePost } from "../redux/postsSlice";

const useCreatePost = (onClose) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const authUser = useSelector(selectUser);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const handleCreatePost = async () => {
    setIsLoading(true);

    try {
      if (!selectedFile || !caption.trim()) {
        if (!selectedFile && !caption.trim()) {
          dispatch(setError("Please select an image and enter a caption"));
        } else if (!selectedFile) {
          dispatch(setError("Please select an image to upload"));
        } else {
          dispatch(setError("Please enter a caption"));
        }
        return;
      }

      const newPost = {
        caption: caption,
        likes: [],
        comments: [],
        createdAt: Date.now(),
        createdBy: authUser.uid,
      };

      const postsCollectionRef = collection(firestore, "posts");
      const postDocRef = await addDoc(postsCollectionRef, newPost);
      const userDocRef = doc(firestore, "users", authUser.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadUrl = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { imageUrl: downloadUrl });

      newPost.imageUrl = downloadUrl;

      dispatch(addPost({ ...newPost, id: postDocRef.id }));
      onClose();
      console.log("Post created");
    } catch (error) {
      console.error("Error creating post:", error);
      dispatch(setError(error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (post, onClose) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;
    try {
      setIsDeleting(true);

      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(firestore, "users", authUser.uid);
      await deleteDoc(doc(firestore, "posts", post.id));

      await updateDoc(userRef, { posts: arrayRemove(post.id) });

      dispatch(deletePost(post.id));
      dispatch(deleteUserPost(post.id));
      onClose();

    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024;
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxSize) {
        dispatch(setError("Image size is greater than 2 MB"));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile(reader.result);
        console.log("Image selected");
      };
      reader.readAsDataURL(file);
      e.target.value = null;

    } else {
      dispatch(setError("Please select a valid image file"));
    }
  };

  const clearSelectedFile = (e) => {
    e.preventDefault();
    setSelectedFile(null);
    console.log("File cleared");
  };

  return {
    selectedFile,
    isLoading,
    handleImageUpload,
    handleCreatePost,
    handleDeletePost,
    caption,
    setCaption,
    error,
    clearSelectedFile,
    isDeleting,
  };
};

export default useCreatePost;
