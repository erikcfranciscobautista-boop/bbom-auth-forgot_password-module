import { z } from "zod";

export const AuthForgotPasswordInSchema = z.object({
  username: z.string().min(1, "username is required"),
});

export type AuthForgotPasswordInDto = z.infer<typeof AuthForgotPasswordInSchema>;
