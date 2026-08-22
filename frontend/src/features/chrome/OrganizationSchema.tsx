import { LOGO_PATH, SITE_URL } from "@/lib/seo";

/**
 * sameAs is intentionally empty: no confirmed social profile URLs exist yet.
 * Populate it once real Instagram/TikTok/LinkedIn accounts exist, never with
 * invented placeholder links.
 */
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Ai-Nativ",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}${LOGO_PATH}`,
  description: "AI education and content systems brand based in Nairobi, Kenya.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  sameAs: [],
};

export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
    />
  );
}
