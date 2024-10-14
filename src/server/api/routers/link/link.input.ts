import { z } from "zod";

export const retrieveOriginalUrlSchema = z.object({
  alias: z.string(),
  domain: z.string(),
  // have a from that specifies who called this function, whether the metadata generation func
  // or the actual domain retriever
  from: z.enum(["metadata", "redirection"]),
});

export const getLinkSchema = z.object({
  id: z.number(),
});

export const listLinksSchema = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(10),
  orderBy: z.enum(["createdAt", "totalClicks"]).default("createdAt"),
  orderDirection: z.enum(["asc", "desc"]).default("desc"),
});

export const createLinkSchema = z.object({
  url: z.string(),
  alias: z.string().optional(),
  disableLinkAfterClicks: z.number().optional(),
  disableLinkAfterDate: z.date().optional(),
  password: z.string().optional(),
  domain: z.string().optional(),
  note: z.string().optional(),
  metadata: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
    })
    .optional(),
});

export const quickLinkShorteningSchema = z.object({
  url: z.string().url(),
});

export const updateLinkSchema = createLinkSchema.partial().extend({
  id: z.number(),
  disabled: z.boolean().optional(),
  publicStats: z.boolean().optional(),
  note: z.string().optional(),
});

export const verifyLinkPasswordSchema = z.object({
  id: z.number(),
  password: z.string(),
});

export const rangeEnum = z.enum([
  "24h",
  "7d",
  "30d",
  "90d",
  "this_month",
  "last_month",
  "this_year",
  "last_year",
]);

export type RangeEnum = z.infer<typeof rangeEnum>;

export type CreateLinkInput = z.infer<typeof createLinkSchema>;
export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;
export type GetLinkInput = z.infer<typeof getLinkSchema>;
export type RetrieveOriginalUrlInput = z.infer<typeof retrieveOriginalUrlSchema>;

export type QuickLinkShorteningInput = z.infer<typeof quickLinkShorteningSchema>;

export type ListLinksInput = z.infer<typeof listLinksSchema>;
