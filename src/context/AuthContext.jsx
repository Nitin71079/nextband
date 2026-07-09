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
  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [premium, setPremium] =
    useState(false);

  const [premiumPlan, setPremiumPlan] =
    useState("");

  const [
    premiumExpires,
    setPremiumExpires,
  ] = useState(null);

  const [admin, setAdmin] =
    useState(false);

  const [name, setName] =
    useState("");

  function resetUserData() {
    setPremium(false);
    setPremiumPlan("");
    setPremiumExpires(null);
    setAdmin(false);
    setName("");
  }

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (currentUser) => {
          setLoading(true);

          setUser(currentUser);

          if (!currentUser) {
            resetUserData();
            setLoading(false);
            return;
          }

          try {
            const userRef = doc(
              db,
              "users",
              currentUser.uid
            );

            const userSnap =
              await getDoc(userRef);

            if (!userSnap.exists()) {
              resetUserData();
              setLoading(false);
              return;
            }

            const data =
              userSnap.data();

            setName(
              data.name || ""
            );

            setAdmin(
              data.admin || false
            );

            setPremiumPlan(
              data.premiumPlan || ""
            );

            setPremiumExpires(
              data.premiumExpires || null
            );

            let premiumActive =
              data.premium || false;

            if (
              premiumActive &&
              data.premiumExpires
            ) {
              const expiry =
                data.premiumExpires.toDate
                  ? data.premiumExpires.toDate()
                  : new Date(
                      data.premiumExpires
                    );

              if (expiry < new Date()) {
                premiumActive = false;
              }
            }

            setPremium(
              premiumActive
            );
          } catch (error) {
            console.error(
              "Error loading user:",
              error
            );

            resetUserData();
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
        premiumPlan,
        premiumExpires,
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