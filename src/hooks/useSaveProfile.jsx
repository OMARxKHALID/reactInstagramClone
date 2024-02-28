import { useState, useCallback } from 'react';
import { setUserProfile, setError, setEditing } from '../redux/userProfileSlice';
import { setUser } from '../redux/authSlice';
import { firestore, storage } from '../firebase/Firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

const useSaveProfile = (selectedImage, userProfile, dispatch, isEditing) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveProfile = useCallback(
        async (updatedProfile) => {
            setIsLoading(true);
            try {
                let imageUrl = userProfile.profilePicUrl;

                if (selectedImage) {
                    const storageRef = ref(storage, `profilePics/${userProfile.uid}`);
                    await uploadString(storageRef, selectedImage, "data_url");
                    imageUrl = await getDownloadURL(ref(storage, `profilePics/${userProfile.uid}`));
                }

                const updatedUserProfile = {
                    ...updatedProfile,
                    profilePicUrl: imageUrl,
                };

                const userDocRef = doc(firestore, "users", userProfile.uid);
                await updateDoc(userDocRef, updatedUserProfile);

                dispatch(setUserProfile(updatedUserProfile));
                dispatch(setUser(updatedUserProfile));
                dispatch(setEditing(!isEditing));
            } catch (error) {
                console.error("Error while updating profile:", error);
                dispatch(setError(error.message));
            } finally {
                setIsLoading(false);
            }
        },
        [selectedImage, userProfile, dispatch, isEditing]
    );

    return {
        handleSaveProfile,
        isLoading
    };
};

export default useSaveProfile;
