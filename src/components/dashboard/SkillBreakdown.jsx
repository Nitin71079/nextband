import { TrendingUp } from "lucide-react";

export default function SkillBreakdown({
  analytics = {},
}) {

  const skills = [

    {
      name: "Reading",
      icon: "📖",
      score: analytics.reading ?? 7.5,
      width: 75,
      className: "reading",
    },

    {
      name: "Listening",
      icon: "🎧",
      score: analytics.listening ?? 8.0,
      width: 80,
      className: "listening",
    },

    {
      name: "Writing",
      icon: "✍",
      score: analytics.writing ?? 6.5,
      width: 65,
      className: "writing",
    },

    {
      name: "Speaking",
      icon: "🎤",
      score: analytics.speaking ?? 6.5,
      width: 65,
      className: "speaking",
    },

  ];

  return (

    <section className="dashboard-section">

      <div className="section-header">

        <div>

          <h2>

            Skill Breakdown

          </h2>

          <p>

            Estimated performance across each IELTS module.

          </p>

        </div>

      </div>

      <div className="skills-card">

        {skills.map((skill) => (

          <div
            key={skill.name}
            className="skill-item"
          >

            <div className="skill-row">

              <span>

                {skill.icon} {skill.name}

              </span>

              <strong>

                Band {skill.score}

              </strong>

            </div>

            <div className="skill-bar">

              <div
                className={`fill ${skill.className}`}
                style={{
                  width: `${skill.width}%`,
                }}
              />

            </div>

            <div className="skill-footer">

              <span>

                Excellent Progress

              </span>

              <div className="skill-trend">

                <TrendingUp size={14} />

                Improving

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}