export async function startCheckout(
  plan
) {
  const links = {
    "Premium Monthly":
      "PASTE_MONTHLY_LINK_HERE",

    "Premium 3 Months":
      "PASTE_3MONTH_LINK_HERE",
  };

  const url =
    links[plan];

  if (!url) {
    alert(
      "Plan not available."
    );
    return;
  }

  window.location.href =
    url;
}