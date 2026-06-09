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

export default function PremiumGate({
children
}) {
const { user } = useAuth();

const navigate =
useNavigate();

const [loading,
setLoading] =
useState(true);

const [isPremium,
setIsPremium] =
useState(false);

useEffect(() => {
async function checkPremium() {
try {
if (!user) {
setLoading(false);
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

      setIsPremium(
        !!userData.premium
      );
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

checkPremium();

}, [user]);

async function handleUpgrade() {
  try {
    const response =
      await fetch("/api/checkout", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          uid: user.uid,
        }),
      });

    console.log(
      "STATUS:",
      response.status
    );

    const raw =
      await response.text();

    console.log(
      "RAW RESPONSE:",
      raw
    );

    alert(
      `Status: ${response.status}`
    );
  } catch (error) {
    console.error(error);
  }
}


if (loading) {
return (
<div
style={{
minHeight:
"100vh",
display:
"flex",
justifyContent:
"center",
alignItems:
"center",
background:
"#f8fafc",
fontSize:
"24px",
fontWeight:
"bold",
}}
>
Loading... </div>
);
}

if (!user) {
return (
<div
style={{
minHeight:
"100vh",
display:
"flex",
justifyContent:
"center",
alignItems:
"center",
background:
"#f8fafc",
padding:
"30px",
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
"600px",
textAlign:
"center",
boxShadow:
"0 10px 30px rgba(0,0,0,0.08)",
}}
> <h1>
Login Required </h1>

      <p>
        Please login to
        access premium
        IELTS features.
      </p>

      <button
        onClick={() =>
          navigate(
            "/login"
          )
        }
        className="primary-btn"
      >
        Go To Login
      </button>
    </div>
  </div>
);

}

if (!isPremium) {
return (
<div
style={{
minHeight:
"100vh",
display:
"flex",
justifyContent:
"center",
alignItems:
"center",
background:
"#f8fafc",
padding:
"30px",
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
"0 10px 30px rgba(0,0,0,0.08)",
}}
> <h1>
Premium Feature </h1>

      <p>
        Unlock advanced
        analytics, AI
        scoring, full
        mock exams,
        premium speaking
        feedback, and
        personalized
        IELTS coaching.
      </p>

      <button
        onClick={
          handleUpgrade
        }
        style={{
          background:
            "#22c55e",
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
            "18px",
          color:
            "white",
        }}
      >
        Upgrade To Premium
      </button>
    </div>
  </div>
);

}

return children;
}
