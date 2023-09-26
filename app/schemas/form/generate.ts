import { z } from "zod";

export const playlistGenerateSchema = z.object({
	seeds: z.string().max(50),
});
