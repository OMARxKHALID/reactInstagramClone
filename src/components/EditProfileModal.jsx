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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-xl z-50 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-20 h-20">
              <img
                className="w-full h-full object-cover rounded-full border-2 border-pink-600 p-1"
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
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded"
            >
              Change Image
            </button>
          </div>

          <div>
            <label htmlFor="username" className="block mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={updatedProfile.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="fullname" className="block mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={updatedProfile.fullname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={updatedProfile.bio}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded"
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
