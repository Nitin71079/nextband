/**
 * /api/analytics
 *
 * Proxies Google Analytics 4 Data API requests to avoid CORS and
 * keep the GA4 service account credentials server-side.
 *
 * Required environment variables:
 *   GA4_PROPERTY_ID      — e.g. "properties/123456789"
 *   GA4_CLIENT_EMAIL     — service account email
 *   GA4_PRIVATE_KEY      — service account private key (with \n escaped as \\n in .env)
 *
 * The service account must have "Viewer" role on the GA4 property.
 */

import { GoogleAuth } from "google-auth-library";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const propertyId = process.env.GA4_PROPERTY_ID;
  const clientEmail = process.env.GA4_CLIENT_EMAIL;
  const privateKey = process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!propertyId || !clientEmail || !privateKey) {
    return res.status(503).json({
      error: "GA4 credentials not configured",
      configured: false,
    });
  }

  try {
    // Authenticate with GA4 Data API
    const auth = new GoogleAuth({
      credentials: { client_email: clientEmail, private_key: privateKey },
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
    });

    const client = await auth.getClient();
    const tokenInfo = await client.getAccessToken();
    const token = tokenInfo.token;

    // Fetch last 7 days of pageviews + sessions + active users
    const body = {
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [
        { name: "sessions" },
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "newUsers" },
      ],
    };

    const gaRes = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/${propertyId}:runReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!gaRes.ok) {
      const err = await gaRes.text();
      console.error("GA4 API error:", err);
      return res.status(gaRes.status).json({ error: "GA4 API error", details: err });
    }

    const data = await gaRes.json();

    // Also fetch top pages
    const topPagesBody = {
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 10,
    };

    const topPagesRes = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/${propertyId}:runReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(topPagesBody),
      }
    );

    const topPagesData = topPagesRes.ok ? await topPagesRes.json() : null;

    // Fetch traffic by source
    const sourcesBody = {
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "sessionSource" }],
      metrics: [{ name: "sessions" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 8,
    };

    const sourcesRes = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/${propertyId}:runReport`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sourcesBody),
      }
    );

    const sourcesData = sourcesRes.ok ? await sourcesRes.json() : null;

    return res.json({
      configured: true,
      dailyStats: data,
      topPages: topPagesData,
      sources: sourcesData,
    });
  } catch (err) {
    console.error("Analytics handler error:", err);
    return res.status(500).json({ error: err.message });
  }
}
