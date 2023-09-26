import { z } from "zod";

export const playlistGenerateSchema = z.object({
	seeds: z.string().min(2).max(50),
});
