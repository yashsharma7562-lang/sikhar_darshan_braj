import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import {
  safeRequestId,
  validateApiMutation,
} from "./lib/security/request-security";

const intlMiddleware = createMiddleware(routing);
export default function proxy(request: NextRequest) {
  const requestId = safeRequestId(request.headers.get("x-request-id"));
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const validation = validateApiMutation(
      request.method,
      request.headers.get("content-type"),
      request.headers.get("content-length"),
      request.headers.get("origin"),
      request.nextUrl.origin,
      process.env.NEXT_PUBLIC_APP_URL
        ? new URL(process.env.NEXT_PUBLIC_APP_URL).origin
        : null,
    );
    if (!validation.allowed)
      return Response.json(
        { message: validation.message, requestId },
        { status: validation.status, headers: { "x-request-id": requestId } },
      );
    const headers = new Headers(request.headers);
    headers.set("x-request-id", requestId);
    const response = NextResponse.next({ request: { headers } });
    response.headers.set("x-request-id", requestId);
    response.headers.set("Cache-Control", "no-store");
    return response;
  }
  if (request.nextUrl.pathname === "/firebase-test") {
    const response = NextResponse.next();
    response.headers.set("x-request-id", requestId);
    return response;
  }
  const dharamshalas = request.nextUrl.pathname.match(
    /^\/(en|hi)\/dharamshalas(?:\/|$)/,
  );
  if (dharamshalas) {
    const destination = new URL("/" + dharamshalas[1] + "/stays", request.url);
    destination.searchParams.set("type", "dharamshala");
    const response = NextResponse.redirect(destination, 308);
    response.headers.set("x-request-id", requestId);
    return response;
  }
  const publicVendorRegistration = /^\/(en|hi)\/vendor\/register(?:\/|$)/.test(
    request.nextUrl.pathname,
  );
  const match = publicVendorRegistration
    ? null
    : request.nextUrl.pathname.match(
        /^\/(en|hi)\/(dashboard|book|payments|itinerary|assistance|rewards|vendor|agent|content|admin|support|operations|crm|chaurasi-kos\/journey)(?:\/|$)/,
      );
  if (match && !request.cookies.has("shikhar_session")) {
    const login = new URL("/" + match[1] + "/login", request.url);
    login.searchParams.set("next", match[2] ?? "dashboard");
    const response = NextResponse.redirect(login);
    response.headers.set("x-request-id", requestId);
    return response;
  }
  const response = intlMiddleware(request);
  response.headers.set("x-request-id", requestId);
  return response;
}
export const config = {
  matcher: ["/api/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
