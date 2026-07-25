import "./WhyKnarrow.css";
import { motion } from "framer-motion";

import {
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";

export default function WhyKnarrow() {

  const traditional = [

    "Limited AI Feedback",

    "Generic Study Plans",

    "Basic Progress Tracking",

    "Manual Essay Review",

    "Fewer Mock Tests",

    "Minimal Personalization",

  ];

  const knarrow = [

    "AI Writing Evaluation",

    "AI Speaking Feedback",

    "Personalized Study Planner",

    "Full IELTS CBT Experience",

    "Advanced Performance Analytics",

    "Predicted IELTS Band",

  ];

  return (

    <motion.section

      className="why"

      initial={{
        opacity:0,
      }}

      whileInView={{
        opacity:1,
      }}

      viewport={{
        once:true,
      }}

      transition={{
        duration:.6,
      }}

    >

      <div className="why-header">

        <span>

          <Sparkles size={15}/>

          WHY KNARROW

        </span>

        <h2>

          Traditional IELTS Preparation

          <br/>

          vs Knarrow

        </h2>

        <p>

          Knarrow combines realistic CBT exams,

          AI evaluation,

          analytics,

          and personalized learning

          into one modern IELTS preparation platform.

        </p>

      </div>

      <div className="comparison">

        <motion.div

          className="comparison-card old"

          initial={{
            opacity:0,
            x:-30,
          }}

          whileInView={{
            opacity:1,
            x:0,
          }}

          viewport={{
            once:true,
          }}

        >

          <h3>

            Traditional Preparation

          </h3>

          {traditional.map((item)=>(

            <div

              key={item}

              className="comparison-item"

            >

              <XCircle size={20}/>

              <span>

                {item}

              </span>

            </div>

          ))}

        </motion.div>

        <motion.div

          className="comparison-card new"

          initial={{
            opacity:0,
            x:30,
          }}

          whileInView={{
            opacity:1,
            x:0,
          }}

          viewport={{
            once:true,
          }}

          transition={{
            delay:.15,
          }}

        >

          <h3>

            Knarrow

          </h3>

          {knarrow.map((item)=>(

            <div

              key={item}

              className="comparison-item"

            >

              <CheckCircle2 size={20}/>

              <span>

                {item}

              </span>

            </div>

          ))}

        </motion.div>

      </div>

    </motion.section>

  );

}