import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No ISR/revalidation is used (static pages + dynamic API routes), so the default
// in-memory cache is enough and no R2 bucket is required for the first deploy.
// To enable ISR later, add the R2 incremental cache override and bucket binding:
// https://opennext.js.org/cloudflare/caching
export default defineCloudflareConfig({});
