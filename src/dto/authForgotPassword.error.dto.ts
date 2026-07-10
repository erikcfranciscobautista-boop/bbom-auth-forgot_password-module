export interface AuthForgotPasswordErrorDetailsDto {
  traceId: string;
  message: string;
  missing?: string[];
}

export interface AuthForgotPasswordErrorOutDto {
  errorType: "BBOM-CLIENT" | "BBOM-CONNECTION";
  errorCode: number;
  details: AuthForgotPasswordErrorDetailsDto;
}
