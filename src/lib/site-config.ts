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
// The confirmed production domain is indexable. Set false on hosted previews.
export const indexingEnabled = process.env.SITE_INDEXING_ENABLED !== "false";
