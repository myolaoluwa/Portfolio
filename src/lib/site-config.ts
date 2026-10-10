// Confirmed by Olaoluwa. Override only for a separately hosted preview.
export const siteUrl = new URL(
  process.env.SITE_URL || "https://delightech.net",
);
if (
  siteUrl.protocol !== "https:" ||
  siteUrl.username ||
  siteUrl.password ||
  siteUrl.pathname !== "/" ||
  siteUrl.search ||
  siteUrl.hash
) {
  throw new Error(
    "SITE_URL must be an HTTPS origin without credentials, path, query, or fragment.",
  );
}
// Hosted previews must not inherit production indexing, even when their
// environment accidentally includes SITE_INDEXING_ENABLED=true.
const hostedPreview =
  process.env.VERCEL_ENV === "preview" ||
  process.env.VERCEL_ENV === "development";
export const indexingEnabled =
  !hostedPreview && process.env.SITE_INDEXING_ENABLED !== "false";
