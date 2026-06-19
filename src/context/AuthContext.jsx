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
              }
            } catch (error) {
              console.error(
                "Error loading user:",
                error
              );

              setPremium(false);
              setAdmin(false);
            }
          } else {
            setPremium(false);
            setAdmin(false);
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