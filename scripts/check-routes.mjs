const baseUrl = process.env.ROUTE_CHECK_BASE_URL ?? "http://localhost:3000";
const publicPaths = [
  "",
  "/accessibility",
  "/chaurasi-kos",
  "/destinations",
  "/destinations/vrindavan",
  "/help",
  "/live-darshan",
  "/login",
  "/packages",
  "/plan",
  "/privacy",
  "/safety",
  "/search",
  "/stays",
  "/temples",
  "/temples/banke-bihari-temple",
  "/terms",
  "/transport",
  "/vendor/register",
];
const protectedPaths = [
  "/admin",
  "/agent",
  "/assistance",
  "/book",
  "/chaurasi-kos/journey",
  "/content",
  "/crm",
  "/dashboard",
  "/itinerary",
  "/operations",
  "/payments",
  "/rewards",
  "/support",
  "/vendor",
];
const failures = [];
for (const locale of ["en", "hi"]) {
  for (const path of publicPaths) {
    const url = baseUrl + "/" + locale + path;
    const response = await fetch(url, { redirect: "manual" });
    if (response.status !== 200)
      failures.push(url + " expected 200, received " + response.status);
  }
  for (const path of protectedPaths) {
    const url = baseUrl + "/" + locale + path;
    const response = await fetch(url, { redirect: "manual" });
    const location = response.headers.get("location") ?? "";
    if (
      ![307, 308].includes(response.status) ||
      !location.includes("/" + locale + "/login")
    )
      failures.push(
        url +
          " expected locale login redirect, received " +
          response.status +
          " " +
          location,
      );
  }
  const dharamshalas = await fetch(baseUrl + "/" + locale + "/dharamshalas", {
    redirect: "manual",
  });
  const dharamshalaLocation = dharamshalas.headers.get("location") ?? "";
  if (
    ![307, 308].includes(dharamshalas.status) ||
    !dharamshalaLocation.includes("/" + locale + "/stays?type=dharamshala")
  )
    failures.push("/" + locale + "/dharamshalas has an invalid redirect");
}
for (const path of ["/api/emergency-resources", "/api/search?q=vrindavan"]) {
  const response = await fetch(baseUrl + path);
  if (response.status !== 200)
    failures.push(path + " expected 200, received " + response.status);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    "Route check passed for " +
      (publicPaths.length * 2 + protectedPaths.length * 2 + 4) +
      " public, protected, redirect and API paths.",
  );
}
