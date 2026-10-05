/* The ONLY front-end file the back end may edit: set these to the real endpoints. */
window.BJ_CONFIG = {
  site: "https://brotherjimi.com",
  subscribe: "/api/subscribe",   // POST {email, ref, source}  -> 2xx on success
  prayer: "/api/prayer",         // POST {prayer}               -> 2xx on success
  checkout: "/api/checkout"      // POST {amount}  -> 2xx JSON {url} (Stripe Checkout, mode: subscription)
};
