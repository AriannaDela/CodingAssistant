import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_BACKEND_API_URL: z
    .string()
    .default(
      process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:4000",
    ),
});

export const env = envSchema.parse(process.env);
