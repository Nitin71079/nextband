import {
  BookOpen,
  PenSquare,
  Mic,
  Headphones,
  BrainCircuit,
} from "lucide-react";

export default function RecentActivity({ activities = [] }) {
  const recentActivities = activities.length
    ? activities
    : [
        {
          icon: <BookOpen size={22} />,
          title: "Reading Practice",
          description: "Completed Reading Test 3",
          time: "Today",
          type: "reading",
        },
        {
          icon: <PenSquare size={22} />,
          title: "Writing Evaluation",
          description: "AI estimated Band 7.0",
          time: "Yesterday",
          type: "writing",
        },
        {
          icon: <Mic size={22} />,
          title: "Speaking Practice",
          description: "Cue Card Evaluation Complete",
          time: "2 Days Ago",
          type: "speaking",
        },
        {
          icon: <Headphones size={22} />,
          title: "Listening Practice",
          description: "Scored 34/40 in Mock Test",
          time: "3 Days Ago",
          type: "listening",
        },
        {
          icon: <BrainCircuit size={22} />,
          title: "AI Coach",
          description: "Generated New Study Plan",
          time: "4 Days Ago",
          type: "ai",
        },
      ];

  return (
    <section className="dashboard-section">
      <div className="activity-card">
        <div className="activity-header">
          <div>
            <h2>Recent Activity</h2>
            <p>Everything you've accomplished recently.</p>
          </div>
        </div>

        <div className="activity-list">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className={`activity-item ${activity.type}`}
            >
              <div className="activity-ripple"></div>

              <div className="activity-icon">
                {activity.icon}
              </div>

              <div className="activity-content">
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
              </div>

              <div className="activity-time">
                {activity.time}
              </div>
            </div>
          ))}
        </div>

        <div className="activity-view-all">
          <button>
            View Full History →
          </button>
        </div>

        <div className="activity-decoration one"></div>
        <div className="activity-decoration two"></div>
      </div>
    </section>
  );
}