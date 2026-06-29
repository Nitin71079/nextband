import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase";

const AuthContext = createContext();

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [premium, setPremium] =
    useState(false);

  const [admin, setAdmin] =
    useState(false);

    const [name, setName] =
  useState("");

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (currentUser) => {
          setUser(currentUser);

          if (currentUser) {
            try {
              const userRef = doc(
                db,
                "users",
                currentUser.uid
              );

              const userSnap =
                await getDoc(
                  userRef
                );

              if (
                userSnap.exists()
              ) {
                const data =
                  userSnap.data();

                  setName(
  data.name || ""
);

                setPremium(
                  data.premium ||
                    false
                );

                setAdmin(
                  data.admin ||
                    false
                );
              } else {
               setPremium(false);
setAdmin(false);
setName("");
              }
            } catch (error) {
              console.error(
                "Error loading user:",
                error
              );

           setPremium(false);
setAdmin(false);
setName("");
            }
          } else {
        setPremium(false);
setAdmin(false);
setName("");
          }

          setLoading(false);
        }
      );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
  user,
  loading,
  premium,
  admin,
  name,
}}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(
    AuthContext
  );
}