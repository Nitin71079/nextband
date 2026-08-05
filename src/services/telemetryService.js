import { getFirestore, doc, setDoc, serverTimestamp, increment } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

// Map raw routes to clean human-readable titles for display
export const ROUTE_LABELS = {
  "/": "Home Page",
  "/dashboard": "Dashboard",
  "/reading": "Reading Center",
  "/listening": "Listening Center",
  "/writing": "Writing Center",
  "/speaking": "Speaking Center",
  "/full-mocks": "Full CBT Mocks",
  "/games": "Games Zone",
  "/pricing": "Pricing / Upgrade",
  "/insights": "AI Insights",
  "/referrals": "Referral Rewards",
  "/study-planner": "Study Planner",
  "/achievements": "Achievements",
  "/leaderboard": "Leaderboard",
  "/support": "Support & Help",
  "/community": "Community Forum",
  "/experts": "Experts Corner",
  "/my-sessions": "My Live Sessions",
};

export function getRouteLabel(path) {
  if (!path) return "—";
  if (ROUTE_LABELS[path]) return ROUTE_LABELS[path];
  
  if (path.startsWith("/reading/")) return "Reading Test Room";
  if (path.startsWith("/listening/")) return "Listening Test Room";
  if (path.startsWith("/writing/")) return "Writing Test Room";
  if (path.startsWith("/speaking/")) return "Speaking Test Room";
  if (path.startsWith("/cbt/")) return "CBT Exam Engine";
  
  return path;
}

/**
 * Record time spent and page visits for a user
 * @param {string} userId - User UID or guest ID
 * @param {string} email - User email or 'Guest'
 * @param {string} displayName - User display name
 * @param {string} path - Current pathname
 * @param {number} secondsToAdd - Seconds spent on this route
 * @param {number} visitsToAdd - Page visits to add (0 or 1)
 */
export async function trackUserTelemetry({
  userId,
  email,
  displayName,
  path,
  secondsToAdd = 0,
  visitsToAdd = 0,
}) {
  if (!userId || !path) return;

  // Clean route path (strip trailing slashes & query params)
  const cleanPath = path.split("?")[0].replace(/\/$/, "") || "/";
  const pathKey = cleanPath.replace(/[\/\.#$\[\]]/g, "_"); // Firestore safe key

  try {
    const docRef = doc(db, "telemetry", userId);

    const updatePayload = {
      userId,
      email: email || "Guest",
      displayName: displayName || email?.split("@")[0] || "Candidate",
      lastPath: cleanPath,
      updatedAt: serverTimestamp(),
    };

    if (secondsToAdd > 0) {
      updatePayload.totalSeconds = increment(secondsToAdd);
      updatePayload[`pageDurations.${pathKey}`] = increment(secondsToAdd);
      updatePayload[`pathNames.${pathKey}`] = cleanPath;
    }

    if (visitsToAdd > 0) {
      updatePayload.totalVisits = increment(visitsToAdd);
      updatePayload[`pageViews.${pathKey}`] = increment(visitsToAdd);
      updatePayload[`pathNames.${pathKey}`] = cleanPath;
    }

    await setDoc(docRef, updatePayload, { merge: true });
  } catch (err) {
    console.warn("Telemetry tracking error:", err);
  }
}
