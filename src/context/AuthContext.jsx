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
  onSnapshot,
  updateDoc,
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

  const [isTrial, setIsTrial] =
    useState(false);

  const [autoRenew, setAutoRenew] =
    useState(false);

  function resetUserData() {
    setPremium(false);
    setPremiumPlan("");
    setPremiumExpires(null);
    setAdmin(false);
    setName("");
    setIsTrial(false);
    setAutoRenew(false);
  }

  useEffect(() => {
    let unsubscribeUserDoc = null;

    const unsubscribeAuth =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setLoading(true);

          setUser(currentUser);

          if (!currentUser) {
            resetUserData();

            if (unsubscribeUserDoc) {
              unsubscribeUserDoc();
            }

            setLoading(false);

            return;
          }

          const userRef = doc(
            db,
            "users",
            currentUser.uid
          );

          unsubscribeUserDoc =
            onSnapshot(
              userRef,
              async (snap) => {
                if (!snap.exists()) {
                  resetUserData();
                  setLoading(false);
                  return;
                }

                const data =
                  snap.data();

                setName(
                  data.name || ""
                );

                setAdmin(
                  data.admin || false
                );

                setIsTrial(
                  data.isTrial || false
                );

                setAutoRenew(
                  data.autoRenew || false
                );

                setPremiumPlan(
                  data.premiumPlan ||
                    data.plan ||
                    ""
                );

                setPremiumExpires(
                  data.premiumExpires ||
                    data.expiresAt ||
                    null
                );

                let premiumActive =
                  data.premium ||
                  false;

                if (
                  premiumActive &&
                  data.premiumExpires
                ) {
                  const expiry =
                    data
                      .premiumExpires
                      .toDate
                      ? data.premiumExpires.toDate()
                      : new Date(
                          data.premiumExpires
                        );

                  if (
                    expiry.getTime() <
                    Date.now()
                  ) {
                    premiumActive =
                      false;

                    try {
                      await updateDoc(
                        userRef,
                        {
                          premium: false,
                        }
                      );
                    } catch (
                      error
                    ) {
                      console.error(
                        error
                      );
                    }
                  }
                }

                setPremium(
                  premiumActive
                );

                setLoading(false);
              },
              (error) => {
                console.error(
                  error
                );

                resetUserData();

                setLoading(false);
              }
            );
        }
      );

    return () => {
      unsubscribeAuth();

      if (unsubscribeUserDoc) {
        unsubscribeUserDoc();
      }
    };
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
        isTrial,
        autoRenew,
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