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

  function resetUserData() {
    setPremium(false);
    setPremiumPlan("");
    setPremiumExpires(null);
    setAdmin(false);
    setName("");
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

                setPremiumPlan(
                  data.premiumPlan ||
                    ""
                );

                setPremiumExpires(
                  data.premiumExpires ||
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

                if (premiumActive) {
                  try {
                    const tracks = data.unlockedTracks || ["IELTS", "DET", "TOEFL", "PTE", "GRE", "CAT", "ACT", "SAT", "GMAT"];
                    const payload = {
                      type: tracks.length >= 8 ? "ALL_ACCESS" : "SINGLE_TRACK",
                      planId: data.premiumPlan || "all_access_monthly",
                      unlockedTracks: tracks,
                      activatedAt: new Date().toISOString()
                    };
                    localStorage.setItem("knarrow_user_plan", JSON.stringify(payload));
                    window.dispatchEvent(new Event("knarrow_plan_changed"));
                  } catch (e) {
                    console.error("Failed to sync premium plan to localStorage:", e);
                  }
                }

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