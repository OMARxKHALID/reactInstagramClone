import { createSlice } from "@reduxjs/toolkit";
import { firestore } from "../firebase/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const initialState = {
  userProfile: null,
  loading: false,
  error: null,
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
  },
});

export const { setLoading, setUserProfile, setError } = userProfileSlice.actions;

export const selectUserProfile = (state) => state.userProfile;

export const fetchUserProfileByUsername = (username) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const querySnapshot = await getDocs(query(collection(firestore, "users"), where("username", "==", username)));
    
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
