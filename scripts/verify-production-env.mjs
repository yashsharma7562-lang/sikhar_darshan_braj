const required = [
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
  "FIREBASE_ADMIN_PROJECT_ID",
  "FIREBASE_ADMIN_CLIENT_EMAIL",
  "FIREBASE_ADMIN_PRIVATE_KEY",
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_SECRET",
  "RAZORPAY_WEBHOOK_SECRET",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "NEXT_PUBLIC_SENTRY_DSN",
];
const missing = required.filter((key) => !process.env[key]?.trim());
if (missing.length) {
  console.error(
    "Missing required production environment variables:",
    missing.join(", "),
  );
  process.exitCode = 1;
} else {
  const appUrl = new URL(process.env.NEXT_PUBLIC_APP_URL);
  if (appUrl.protocol !== "https:") {
    console.error("NEXT_PUBLIC_APP_URL must use HTTPS in production.");
    process.exitCode = 1;
  } else {
    console.log("Production environment contract is complete.");
  }
}
