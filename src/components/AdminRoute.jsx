import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  getFirestore,
  doc,
  getDoc
} from "firebase/firestore";

import { app } from "../firebase";

import {
  useAuth
} from "../context/AuthContext";

export default function AdminRoute({
  children
}) {
  const { user } =
    useAuth();

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
    useState(true);

  const [isAdmin,
    setIsAdmin] =
    useState(false);

  useEffect(() => {
    async function checkAdmin() {
      try {
        if (!user) {
          setLoading(
            false
          );

          return;
        }

        const db =
          getFirestore(app);

        const userRef =
          doc(
            db,
            "users",
            user.uid
          );

        const snapshot =
          await getDoc(
            userRef
          );

        if (
          snapshot.exists()
        ) {
          const userData =
            snapshot.data();

          setIsAdmin(
            userData.admin ||
              false
          );
        }
      } catch (error) {
        console.error(
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    }

    checkAdmin();
  }, [user]);

  if (loading) {
    return (
      <div
        style={{
          minHeight:
            "100vh",

          display: "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          background:
            "#f8fafc",

          fontSize:
            "24px",

          fontWeight:
            "bold"
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div
        style={{
          minHeight:
            "100vh",

          display: "flex",

          justifyContent:
            "center",

          alignItems:
            "center",

          background:
            "#f8fafc",

          padding:
            "30px"
        }}
      >
        <div
          style={{
            background:
              "white",

            padding:
              "50px",

            borderRadius:
              "24px",

            maxWidth:
              "650px",

            textAlign:
              "center",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)"
          }}
        >
          <h1
            style={{
              fontSize:
                "46px",

              marginBottom:
                "20px",

              color:
                "#ef4444"
            }}
          >
            Access Denied
          </h1>

          <p
            style={{
              lineHeight:
                "1.9",

              color:
                "#64748b",

              marginBottom:
                "35px"
            }}
          >
            You do not have
            permission to
            access the admin
            dashboard.
          </p>

          <button
            onClick={() =>
              navigate("/")
            }
            style={{
              background:
                "#22d3ee",

              border:
                "none",

              padding:
                "18px 36px",

              borderRadius:
                "16px",

              fontWeight:
                "bold",

              cursor:
                "pointer",

              fontSize:
                "18px"
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return children;
}