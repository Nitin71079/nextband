import {
  BookOpen,
  PenSquare,
  Mic,
  BrainCircuit,
  ArrowRight,
} from "lucide-react";

export default function RecentActivity({
  activities = [],
}) {

  const recentActivities =
    activities.length
      ? activities
      : [
          {
            icon: <BookOpen size={22} />,
            title: "Reading Practice",
            description: "Completed Reading Test 3",
            time: "Today",
            color: "#3b82f6",
          },
          {
            icon: <PenSquare size={22} />,
            title: "Writing Evaluation",
            description: "AI estimated Band 7.0",
            time: "Yesterday",
            color: "#f59e0b",
          },
          {
            icon: <Mic size={22} />,
            title: "Speaking Practice",
            description: "Cue Card Evaluation Complete",
            time: "2 Days Ago",
            color: "#22c55e",
          },
          {
            icon: <BrainCircuit size={22} />,
            title: "AI Coach",
            description: "Generated New Study Plan",
            time: "3 Days Ago",
            color: "#8b5cf6",
          },
        ];

  return (

    <section className="dashboard-section">

      <div className="section-header">

        <div>

          <h2>

            Recent Activity

          </h2>

          <p>

            Everything you've accomplished recently.

          </p>

        </div>

      </div>

      <div className="activity-list">

        {recentActivities.map((activity, index) => (

          <div
            key={index}
            className="activity-item"
          >

            <div className="activity-left">

              <div
                className="activity-icon"
                style={{
                  background: `${activity.color}15`,
                  color: activity.color,
                }}
              >

                {activity.icon}

              </div>

              <div>

                <h4>

                  {activity.title}

                </h4>

                <p>

                  {activity.description}

                </p>

              </div>

            </div>

            <div className="activity-right">

              <span>

                {activity.time}

              </span>

              <ArrowRight size={18} />

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}