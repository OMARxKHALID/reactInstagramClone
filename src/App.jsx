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
import { auth, db } from "./firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  selectUser,
  setLoading,
  setUser,
} from "./redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { ref, get } from "firebase/database";

const App = () => {

  const user = useSelector(selectUser);
  const loading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = setupAuthListener();

    return () => unsubscribe();
  }, []);

  const setupAuthListener = () => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const serializedUser = {
          email: user.email,
          id: user.uid,
        };
        const userRef = ref(db, `users/${user.uid}`);
        const userSnapshot = await get(userRef);
  
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          const mergedUserData = { ...userData, ...serializedUser };
          dispatch(setUser(mergedUserData));
        } else {
          console.log("User data not found in the database");
        }
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading(false));
    });
  };
  

  const renderRoutes = () => {
    if (loading) {
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
