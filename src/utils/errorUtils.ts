export const extractStatusCode = (error: unknown): number | undefined => {
  if (typeof error !== "object" || error === null) {
    return undefined;
  }

  const maybeError = error as Record<string, unknown>;

  const statusCode = maybeError.statusCode;
  if (typeof statusCode === "number") {
    return statusCode;
  }

  const status = maybeError.status;
  if (typeof status === "number") {
    return status;
  }

  return undefined;
};
