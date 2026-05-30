import {
  logEvent
} from "firebase/analytics";

import { analytics }
from "../firebase";

export function trackEvent(
  eventName,
  params = {}
) {
  try {
    logEvent(
      analytics,
      eventName,
      params
    );
  } catch (error) {
    console.error(
      "Analytics error:",
      error
    );
  }
}