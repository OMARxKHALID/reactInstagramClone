import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/Firebase";

const initialState = {
  userProfile: null,
  loading: false,
  error: null,
  isEditing: false,
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setUserProfile: (state, action) => {
      state.loading = false;
      state.userProfile = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearUserProfile: (state) => {
      state.userProfile = null;
    },
    setEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    addPost: (state, action) => {
      if (state.userProfile) {
        state.userProfile = {
          ...state.userProfile,
          posts: [action.payload.id, ...(state.userProfile.posts || [])],
        };
      }
    },
    deleteUserPost: (state, action) => {
      if (state.userProfile) {
        state.userProfile = {
          ...state.userProfile,
          posts: state.userProfile.posts.filter(
            (postId) => postId !== action.payload
          ),
        };
      }
    },
    setUserProfileStories: (state, action) => {
      state.userProfile = {
       ...state.userProfile,
        stories: action.payload,
      };
    }
  },
});

export const {
  setLoading,
  setUserProfile,
  setError,
  clearError,
  clearUserProfile,
  setEditing,
  addPost,
  deleteUserPost,
  setUserProfileStories,
} = userProfileSlice.actions;

export const selectError = (state) => state.userProfile.error;

export const selectUserProfile = (state) => state.userProfile;

export const fetchUserProfileByUsername = (username) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const querySnapshot = await getDocs(
      query(collection(firestore, "users"), where("username", "==", username))
    );

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        dispatch(setUserProfile(doc.data()));
      });
    } else {
      dispatch(setError("User profile not found"));
    }
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default userProfileSlice.reducer;
