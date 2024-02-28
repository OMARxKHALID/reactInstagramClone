import React, { useState, useEffect } from "react";

const EditProfileModal = ({
  userProfile,
  onSave,
  onClose,
  onImageChange,
  selectedImage,
}) => {
  const [updatedProfile, setUpdatedProfile] = useState({ ...userProfile });

  useEffect(() => {
    if (selectedImage) {
      setUpdatedProfile((prevProfile) => ({
        ...prevProfile,
        profilePicUrl: selectedImage,
      }));
    }
  }, [selectedImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedProfile);
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (file && file.type.startsWith("image/")) {
      if (file.size > maxSize) {
        console.error("Image size is greater than 2 MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg w-full max-w-md mx-auto p-6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center justify-center">
            <div className="relative w-20 h-20 mr-auto">
              <img
                loading="lazy"
                className="w-full h-full object-cover rounded-full border-2 border-pink-300"
                src={
                  updatedProfile.profilePicUrl ||
                  selectedImage ||
                  "https://via.placeholder.com/150"
                }
                alt="profile"
              />
              <input
                type="file"
                id="profilePicUrl"
                name="profilePicUrl"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <button
              type="button"
              onClick={() => document.getElementById("profilePicUrl").click()}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Change Image
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={updatedProfile.username}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="fullname"
              className="block text-sm font-semibold text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={updatedProfile.fullname}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-sm font-semibold text-gray-600"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={updatedProfile.bio}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 w-full bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
