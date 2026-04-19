import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-01-01";
export const hasSanityConfig = Boolean(projectId && dataset);

export const client = hasSanityConfig
  ? createClient({
      projectId: projectId as string,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;
