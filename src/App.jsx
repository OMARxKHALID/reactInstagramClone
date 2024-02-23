import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage";
import Loading from "./utils/Loading";
import { auth, firestore } from "./firebase/Firebase"; 
import { onAuthStateChanged } from "firebase/auth";
import {
  selectUser,
  setLoading,
  setUser,
} from "./redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";

const App = () => {
  const user = useSelector(selectUser);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const unsubscribe = setupAuthListener();
    return () => unsubscribe();
  }, [dispatch]);

  const setupAuthListener = () => {
    return onAuthStateChanged(auth, async (userAuth) => {
      dispatch(setLoading(false));
      if (userAuth) {
        const userDocRef = doc(firestore, "users", userAuth.uid);
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            dispatch(setUser(userData));
          } else {
            console.log("User data not found in the database");
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      } else {
        dispatch(setUser(null));
      }
    });
  };

  const renderRoutes = () => {
    if (isLoading) {
      return <Loading />;
    }
    return (
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/user/:username"
          element={user ? <UserPage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    );
  };

  return <Router>{renderRoutes()}</Router>;
};

export default App;
