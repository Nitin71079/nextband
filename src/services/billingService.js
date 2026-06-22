export async function startCheckout(
  plan
) {
  const links = {
    "Premium Monthly":
      "https://buy.stripe.com/test_8x29AVdhL2gaePh0Svgw000",

    "Premium 3 Months":
      "https://buy.stripe.com/test_8x2cN7elP2gabD57gTgw002",
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