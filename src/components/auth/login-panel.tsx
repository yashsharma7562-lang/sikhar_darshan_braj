"use client";
import { useRef, useState } from "react";
import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  type ConfirmationResult,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { getFirebaseClientAuth } from "@/infrastructure/firebase/client";

type AuthMethod = "google" | "phone" | "otp";

type FirebaseAuthError = Error & { code?: string };

function authErrorMessage(error: unknown, method: AuthMethod) {
  const firebaseError = error as FirebaseAuthError;
  const code = firebaseError?.code;
  const messages: Record<string, string> = {
    "auth/operation-not-allowed":
      "This sign-in method is not enabled in Firebase Authentication.",
    "auth/unauthorized-domain":
      "This domain is not authorized in Firebase Authentication settings.",
    "auth/invalid-app-credential":
      "Firebase could not verify this app. Check the authorized domain and reCAPTCHA configuration.",
    "auth/captcha-check-failed":
      "The reCAPTCHA check failed or expired. Please try again.",
    "auth/too-many-requests":
      "Too many attempts were made. Please wait before trying again.",
    "auth/quota-exceeded":
      "The Firebase SMS quota has been reached. Please try again later.",
    "auth/invalid-phone-number":
      "Enter a valid mobile number with its country code.",
    "auth/invalid-verification-code": "The OTP is incorrect or has expired.",
    "auth/code-expired": "The OTP has expired. Request a new code.",
    "auth/popup-blocked":
      "The Google sign-in popup was blocked. Allow popups and try again.",
    "auth/popup-closed-by-user":
      "Google sign-in was cancelled before it completed.",
    "auth/network-request-failed":
      "Firebase could not be reached. Check your connection and try again.",
  };

  if (code && messages[code]) return messages[code];
  if (code === "auth/internal-error" && method === "phone")
    return "Firebase could not send the OTP. Confirm that Phone sign-in is enabled, India is allowed in the SMS region policy, and use a deployed authorized domain for real SMS.";
  if (code === "auth/internal-error")
    return "Firebase Authentication returned an internal error. Confirm that this provider is enabled in the Firebase console.";
  return firebaseError instanceof Error
    ? firebaseError.message
    : "Authentication failed. Please try again.";
}

export function LoginPanel({ locale }: { locale: string }) {
  const router = useRouter();
  const captcha = useRef<RecaptchaVerifier | null>(null);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    null,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function session(idToken: string) {
    const response = await fetch("/api/auth/session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    const body = (await response.json()) as { error?: string };
    if (!response.ok) throw new Error(body.error ?? "Sign-in failed.");
    router.push("/" + locale + "/dashboard");
    router.refresh();
  }

  async function google() {
    const auth = getFirebaseClientAuth();
    if (!auth) return setMessage("Authentication is not configured yet.");
    setBusy(true);
    setMessage(null);
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      await session(await result.user.getIdToken());
    } catch (error) {
      setMessage(authErrorMessage(error, "google"));
      setBusy(false);
    }
  }

  async function sendOtp() {
    const auth = getFirebaseClientAuth();
    if (!auth) return setMessage("Authentication is not configured yet.");
    if (!/^\+[1-9]\d{7,14}$/.test(phone))
      return setMessage(
        "Enter a mobile number with country code, for example +91�",
      );

    const localHost = ["localhost", "127.0.0.1", "::1"].includes(
      window.location.hostname,
    );
    const testMode = process.env.NEXT_PUBLIC_FIREBASE_AUTH_TEST_MODE === "true";
    if (localHost && !testMode)
      return setMessage(
        "Firebase does not send real SMS OTPs from localhost. Use Google sign-in, deploy to an authorized HTTPS domain, or configure a fictional Firebase test number and enable local test mode.",
      );

    setBusy(true);
    setMessage(null);
    try {
      if (testMode) auth.settings.appVerificationDisabledForTesting = true;
      captcha.current ??= new RecaptchaVerifier(auth, "phone-recaptcha", {
        size: "normal",
      });
      setConfirmation(
        await signInWithPhoneNumber(auth, phone, captcha.current),
      );
      setMessage(
        testMode
          ? "Test OTP requested. Enter the fictional number's configured code."
          : "OTP sent by Firebase. Never share it.",
      );
    } catch (error) {
      captcha.current?.clear();
      captcha.current = null;
      setMessage(authErrorMessage(error, "phone"));
    } finally {
      setBusy(false);
    }
  }

  async function verify() {
    if (!confirmation || !/^\d{6}$/.test(otp))
      return setMessage("Enter the 6-digit OTP.");
    setBusy(true);
    setMessage(null);
    try {
      const result = await confirmation.confirm(otp);
      await session(await result.user.getIdToken());
    } catch (error) {
      setMessage(authErrorMessage(error, "otp"));
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={google}
        disabled={busy}
        className="min-h-12 w-full rounded-xl border bg-white px-5 font-bold disabled:opacity-60"
      >
        Continue with Google
      </button>
      <div className="text-muted flex items-center gap-3 text-sm">
        <span className="bg-border h-px flex-1" />
        or use phone OTP
        <span className="bg-border h-px flex-1" />
      </div>
      <label className="block font-bold" htmlFor="phone">
        Mobile number
      </label>
      <input
        id="phone"
        type="tel"
        autoComplete="tel"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder="+91�"
        className="min-h-12 w-full rounded-xl border bg-white px-4"
      />
      <button
        type="button"
        onClick={sendOtp}
        disabled={busy || confirmation !== null}
        className="bg-peacock-deep min-h-12 w-full rounded-xl px-5 font-bold text-white disabled:opacity-60"
      >
        Send OTP
      </button>
      <div id="phone-recaptcha" />
      {confirmation && (
        <>
          <label className="block font-bold" htmlFor="otp">
            6-digit OTP
          </label>
          <input
            id="otp"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
            className="min-h-12 w-full rounded-xl border bg-white px-4 tracking-[0.4em]"
          />
          <button
            type="button"
            onClick={verify}
            disabled={busy}
            className="bg-primary-deep min-h-12 w-full rounded-xl px-5 font-bold text-white disabled:opacity-60"
          >
            Verify and continue
          </button>
        </>
      )}
      {message && (
        <p role="status" className="bg-sand rounded-xl p-4 text-sm">
          {message}
        </p>
      )}
      <p className="text-muted text-xs">
        Firebase handles identity verification. OTP codes are never logged or
        stored by this application.
      </p>
    </div>
  );
}
