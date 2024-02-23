import { createSlice } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, firestore } from "../firebase/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isUpdating: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setIsUpdating: (state, action) => {
      state.isUpdating = action.payload;
    },
  },
});

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const newUser = userCred.user;

      if (newUser) {
        const userRef = doc(firestore, "users", newUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          dispatch(setUser(userData));
        } else {
          console.log("User data not found in the database");
        }
      } else {
        dispatch(setError("User not found"));
      }
    } catch (error) {
      console.log("Login error:", error.code);
      switch (error.code) {
        case "auth/invalid-email":
          dispatch(
            setError(
              "Sorry, your email was incorrect. Please double-check your email."
            )
          );
          break;
        case "auth/invalid-credential":
          dispatch(
            setError(
              "Sorry, your credentials are invalid. Please double-check your email and password."
            )
          );
          break;
        case "auth/user-not-found":
          dispatch(
            setError("Sorry, there is no user with this email. Please sign up.")
          );
          break;
        case "auth/network-request-failed":
          dispatch(
            setError(
              "Sorry, please check your internet connection and try again."
            )
          );
          break;
        default:
          dispatch(setError("An error occurred. Please try again later."));
          break;
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

export const signupUser =
  ({ fullname, username, email, password }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: email,
          username: username,
          fullname: fullname,
          bio: "",
          profilePicUrl: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };

        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        dispatch(setUser(userDoc));
      }
    } catch (error) {
      console.log("Signup error:", error.code);
      switch (error.code) {
        case "auth/invalid-email":
          dispatch(
            setError(
              "Sorry, your email was incorrect. Please double-check your email."
            )
          );
          break;
        case "auth/weak-password":
          dispatch(
            setError(
              "Sorry, your password is too weak. Please choose a stronger password."
            )
          );
          break;
        case "auth/email-already-in-use":
          dispatch(
            setError(
              "Sorry, this email is already in use. Please use a different email."
            )
          );
        case "auth/network-request-failed":
          dispatch(
            setError(
              "Sorry, please check your internet connection and try again."
            )
          );
          break;
          break;
        default:
          dispatch(setError("An error occurred. Please try again later."));
          break;
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;

export const { setUser, setLoading, setError, logoutUser, setIsUpdating } =
  authSlice.actions;

export default authSlice.reducer;
