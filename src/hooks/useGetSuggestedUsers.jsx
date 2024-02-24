import {
    collection,
    getDocs,
    orderBy,
    query,
    where,
    limit
  } from "firebase/firestore";
  import { useEffect, useState } from "react";
  import { useSelector } from "react-redux";
  import { selectUser } from "../redux/authSlice";
  import { firestore } from "../firebase/Firebase";
  
  const useGetSuggestedUsers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const authUser = useSelector(selectUser);

    useEffect(() => {
      const getSuggestedUsers = async () => {
        setIsLoading(true);
        try {
          const userRef = collection(firestore, "users");
          const q = query(
            userRef,
            where("uid", "not-in", [authUser.uid, ...authUser.following]),
            orderBy("uid"),
            limit(2)
          );
  
          const querySnapshot = await getDocs(q);
          const users = [];
          querySnapshot.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id });
          });
  
          setSuggestedUsers(users);
        } catch (error) {
          console.error("Error while suggesting users:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      if (authUser) getSuggestedUsers();
    }, [authUser]);
  
    return { isLoading, suggestedUsers };
  };
  
  export default useGetSuggestedUsers;
