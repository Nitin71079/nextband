import {
  useEffect,
  useState
} from "react";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  orderBy,
  query
} from "firebase/firestore";

import { app } from "../firebase";

import {
  useAuth
} from "../context/AuthContext";

import useMobile from "../hooks/useMobile";

export default function Community() {
  const { user } =
    useAuth();

  const isMobile =
    useMobile();

  const [post,
    setPost] =
    useState("");

  const [posts,
    setPosts] =
    useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const db =
        getFirestore(app);

      const q = query(
        collection(
          db,
          "communityPosts"
        ),
        orderBy(
          "createdAt",
          "desc"
        )
      );

      const snapshot =
        await getDocs(q);

      const data =
        snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data()
          })
        );

      setPosts(data);
    } catch (error) {
      console.error(
        error
      );
    }
  }

  async function createPost() {
    try {
      if (!post) return;

      const db =
        getFirestore(app);

      await addDoc(
        collection(
          db,
          "communityPosts"
        ),
        {
          content: post,

          email:
            user?.email ||
            "Anonymous",

          createdAt:
            new Date()
        }
      );

      setPost("");

      fetchPosts();
    } catch (error) {
      console.error(
        error
      );
    }
  }

  return (
    <div
      style={{
        minHeight:
          "100vh",

        background:
          "#f8fafc",

        padding: isMobile
          ? "30px 15px"
          : "60px 30px",

        fontFamily:
          "Arial"
      }}
    >
      <div
        style={{
          maxWidth:
            "1000px",

          margin:
            "0 auto"
        }}
      >
        <div
          style={{
            marginBottom:
              "40px"
          }}
        >
          <h1
            style={{
              fontSize:
                isMobile
                  ? "36px"
                  : "52px"
            }}
          >
            Community
          </h1>

          <p
            style={{
              color:
                "#64748b",

              marginTop:
                "10px",

              fontSize:
                "18px"
            }}
          >
            Discuss IELTS,
            ask doubts, and
            connect with
            learners
          </p>
        </div>

        <div
          style={{
            background:
              "white",

            padding:
              isMobile
                ? "25px"
                : "40px",

            borderRadius:
              "24px",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",

            marginBottom:
              "40px"
          }}
        >
          <textarea
            value={post}
            onChange={(e) =>
              setPost(
                e.target.value
              )
            }
            placeholder="Share something with the IELTS community..."
            style={{
              width: "100%",

              minHeight:
                "140px",

              padding:
                "18px",

              borderRadius:
                "16px",

              border:
                "1px solid #cbd5e1",

              resize:
                "vertical",

              fontSize:
                "16px",

              marginBottom:
                "20px"
            }}
          />

          <button
            onClick={
              createPost
            }
            style={{
              background:
                "#22d3ee",

              border:
                "none",

              padding:
                "16px 28px",

              borderRadius:
                "14px",

              color:
                "white",

              fontWeight:
                "bold",

              fontSize:
                "16px",

              cursor:
                "pointer"
            }}
          >
            Create Post
          </button>
        </div>

        <div
          style={{
            display:
              "flex",

            flexDirection:
              "column",

            gap: "25px"
          }}
        >
          {posts.map(
            (post) => (
              <div
                key={post.id}
                style={{
                  background:
                    "white",

                  padding:
                    "28px",

                  borderRadius:
                    "24px",

                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.08)"
                }}
              >
                <div
                  style={{
                    marginBottom:
                      "18px"
                  }}
                >
                  <h3>
                    {
                      post.email
                    }
                  </h3>
                </div>

                <p
                  style={{
                    lineHeight:
                      "1.9",

                    color:
                      "#334155"
                  }}
                >
                  {
                    post.content
                  }
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}