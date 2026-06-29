import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  Sparkles,
  Bot,
  PenSquare,
  Mic,
  BookOpen,
  Headphones,
  CalendarDays,
  BarChart3,
  Crown,
  Home,
  User
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {

  const navigate = useNavigate();

  const { user, name } = useAuth();

  const firstName =
    name ||
    user?.email?.split("@")[0] ||
    "Student";

  const [active, setActive] =
    useState("AI Assistant");

  const menu = [

    {
      title: "Dashboard",
      icon: <Home size={20}/>,
      route: "/dashboard"
    },

    {
      title: "AI Assistant",
      icon: <Bot size={20}/>,
      route: "/ai-assistant"
    },

    {
      title: "Writing AI",
      icon: <PenSquare size={20}/>,
      route: "/mock/writing"
    },

    {
      title: "Speaking AI",
      icon: <Mic size={20}/>,
      route: "/mock/speaking"
    },

    {
      title: "Reading AI",
      icon: <BookOpen size={20}/>,
      route: "/mock/reading"
    },

    {
      title: "Listening AI",
      icon: <Headphones size={20}/>,
      route: "/mock/listening"
    },

    {
      title: "Study Planner",
      icon: <CalendarDays size={20}/>,
      route: "/planner"
    },

    {
      title: "Analytics",
      icon: <BarChart3 size={20}/>,
      route: "/performance"
    }

  ];

  return (

    <aside className="sidebar">

      <div>

        <div className="sidebar-logo">

          <div className="logo-circle">

            <Sparkles size={22}/>

          </div>

          <div>

            <h2>

              NextBand

            </h2>

            <span>

              AI Workspace

            </span>

          </div>

        </div>

        <div className="sidebar-menu">

          {menu.map((item)=>(

            <button

              key={item.title}

              className={
                active===item.title

                ? "sidebar-btn active"

                : "sidebar-btn"
              }

              onClick={()=>{

                setActive(item.title);

                navigate(item.route);

              }}

            >

              {item.icon}

              <span>

                {item.title}

              </span>

            </button>

          ))}

        </div>

      </div>

      <div>

        <div className="premium-card">

          <Crown size={28}/>

          <h3>

            Premium AI

          </h3>

          <p>

            Unlimited evaluations

            Faster responses

            GPT + Groq

          </p>

          <button>

            Upgrade

          </button>

        </div>

        <div className="user-card">

          <div className="user-avatar">

            <User size={22}/>

          </div>

          <div>

            <strong>

              {firstName}

            </strong>

            <span>

              Free Plan

            </span>

          </div>

        </div>

      </div>

    </aside>

  );

}