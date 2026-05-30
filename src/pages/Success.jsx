import {
  useEffect
} from "react";

import {
  doc,
  updateDoc
} from "firebase/firestore";

import {
  auth,
  db
} from "../firebase";

import {
  Link
} from "react-router-dom";

import toast
from "react-hot-toast";

export default function Success() {
  useEffect(() => {
    async function activatePremium() {
      try {
        const user =
          auth.currentUser;

        if (!user) return;

        await updateDoc(
          doc(
            db,
            "users",
            user.uid
          ),
          {
            premium: true
          }
        );

        toast.success(
          "Premium Activated!"
        );
      } catch (error) {
        console.error(
          error
        );

        toast.error(
          "Premium activation failed."
        );
      }
    }

    activatePremium();
  }, []);

  return (
    <div className="container fade-in">
      <div
        className="card"
        style={{
          textAlign:
            "center",

          padding:
            "100px 30px"
        }}
      >
        <div
          style={{
            fontSize:
              "80px",

            marginBottom:
              "25px"
          }}
        >
          🎉
        </div>

        <h1
          className="section-title"
        >
          Payment Successful
        </h1>

        <p
          className="section-subtitle"
          style={{
            maxWidth:
              "700px",

            margin:
              "0 auto 40px"
          }}
        >
          Your Premium
          subscription has been
          activated successfully.
          You now have access to
          advanced AI features,
          mock tests, analytics,
          and premium tools.
        </p>

        <Link to="/dashboard">
          <button className="primary-btn">
            Go To Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}