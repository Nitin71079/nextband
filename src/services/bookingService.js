const KEY =
  "expert_bookings";

export function getBookings() {
  return JSON.parse(
    localStorage.getItem(KEY) ||
      "[]"
  );
}
export function createBooking(
  booking
) {
  const bookings =
    getBookings();

  bookings.push({
    ...booking,
    createdAt:
      Date.now(),
  });

  localStorage.setItem(
    KEY,
    JSON.stringify(
      bookings
    )
  );
}
export function saveBooking(
  booking
) {
  const bookings =
    getBookings();

  bookings.push(booking);

  localStorage.setItem(
    KEY,
    JSON.stringify(
      bookings
    )
  );
}

export function cancelBooking(
  index
) {
  const bookings =
    getBookings();

  bookings.splice(
    index,
    1
  );

  localStorage.setItem(
    KEY,
    JSON.stringify(
      bookings
    )
  );
}