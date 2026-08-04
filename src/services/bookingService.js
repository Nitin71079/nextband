const KEY = "expert_bookings";

export function getBookings() {
  const data = localStorage.getItem(KEY);
  if (!data) {
    // Seed initial demo booking for rich UX
    const initialBookings = [
      {
        id: "bk-demo-1",
        expertId: "ai-bot",
        expertName: "Knarrow AI IELTS Examiner (v4.5)",
        expertRole: "24/7 AI Examiner Bot",
        isAIBot: true,
        date: new Date().toISOString().split("T")[0],
        timeSlot: "Instant 24/7 Session",
        duration: 60,
        skillFocus: "Speaking Mock Part 1, 2 & 3",
        status: "Completed",
        pricePaid: "₹0 (Trial Pass)",
        scoreReport: {
          overallBand: "7.5",
          fluency: "7.5",
          lexical: "8.0",
          grammar: "7.0",
          pronunciation: "7.5",
        },
        createdAt: Date.now() - 86400000,
      },
    ];
    localStorage.setItem(KEY, JSON.stringify(initialBookings));
    return initialBookings;
  }
  return JSON.parse(data);
}

export function createBooking(booking) {
  const bookings = getBookings();
  const newBooking = {
    id: `bk-${Date.now()}`,
    createdAt: Date.now(),
    status: booking.status || "Upcoming",
    ...booking,
  };
  bookings.unshift(newBooking);
  localStorage.setItem(KEY, JSON.stringify(bookings));
  return newBooking;
}

export function saveBooking(booking) {
  return createBooking(booking);
}

export function updateBookingStatus(id, newStatus) {
  const bookings = getBookings();
  const updated = bookings.map((b) =>
    b.id === id ? { ...b, status: newStatus } : b
  );
  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export function cancelBooking(indexOrId) {
  const bookings = getBookings();
  let updated;
  if (typeof indexOrId === "number") {
    updated = bookings.filter((_, i) => i !== indexOrId);
  } else {
    updated = bookings.filter((b) => b.id !== indexOrId);
  }
  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}