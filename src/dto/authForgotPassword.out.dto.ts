import { z } from "zod";

export const AuthForgotPasswordOutSchema = z.object({
  message: z.string(),
});

export type AuthForgotPasswordOutDto = z.infer<typeof AuthForgotPasswordOutSchema>;
