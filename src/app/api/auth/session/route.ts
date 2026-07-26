import { NextResponse } from "next/server";
import { z } from "zod";
import { SESSION_COOKIE } from "@/features/auth/types";
import { getFirebaseAdminAuth } from "@/infrastructure/firebase/admin";

const schema = z.object({ idToken: z.string().min(100).max(5000) });
const maxAge = 60 * 60 * 24 * 5;
export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return NextResponse.json(
      { error: "A valid Firebase ID token is required." },
      { status: 400 },
    );
  const auth = getFirebaseAdminAuth();
  if (!auth)
    return NextResponse.json(
      { error: "Authentication is not configured." },
      { status: 503 },
    );
  try {
    const decoded = await auth.verifyIdToken(parsed.data.idToken);
    if (Date.now() / 1000 - (decoded.auth_time ?? 0) > 300)
      return NextResponse.json(
        { error: "Please sign in again." },
        { status: 401 },
      );
    const value = await auth.createSessionCookie(parsed.data.idToken, {
      expiresIn: maxAge * 1000,
    });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
      priority: "high",
    });
    return response;
  } catch {
    return NextResponse.json(
      { error: "The sign-in credential could not be verified." },
      { status: 401 },
    );
  }
}
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
