import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

function normalizePrivateKey(value: string | undefined) {
  return value
    ?.replace(/\\n/g, "\n")
    .trim()
    .replace(/^["']/, "")
    .replace(/["',]+$/, "")
    .trim();
}

export function getFirebaseAdminAuth() {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = normalizePrivateKey(
    process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  );
  if (!projectId || !clientEmail || !privateKey) return null;
  const app =
    getApps()[0] ??
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  return getAuth(app);
}
