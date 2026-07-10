const EMAIL_SEPARATOR = "@";

const toLower = (value: string): string => value.toLowerCase();

const obfuscateEmail = (value: string): string => {
  const [local, domain] = value.split(EMAIL_SEPARATOR);
  if (!local || !domain) {
    return `${toLower(value.slice(0, 2) || value.slice(0, 1))}***`;
  }

  if (local.length === 1) {
    return `${toLower(local)}***@${toLower(domain)}`;
  }

  if (local.length === 2) {
    return `${toLower(local)}***@${toLower(domain)}`;
  }

  if (local.length === 3) {
    return `${toLower(local.slice(0, 2))}***${toLower(local.slice(-1))}@${toLower(domain)}`;
  }

  return `${toLower(local.slice(0, 2))}***${toLower(local.slice(-2))}@${toLower(domain)}`;
};

const obfuscatePhone = (value: string): string => {
  const visible = value.slice(0, 4);
  return `${visible}****`;
};

const obfuscateUsername = (value: string): string => {
  const visible = value.length >= 2 ? value.slice(0, 2) : value.slice(0, 1);
  return `${toLower(visible)}***`;
};

export const obfuscateIdentifier = (username: string): string => {
  const trimmed = username.trim();

  if (trimmed.includes(EMAIL_SEPARATOR)) {
    return obfuscateEmail(trimmed);
  }

  if (/^\d+$/.test(trimmed)) {
    return obfuscatePhone(trimmed);
  }

  return obfuscateUsername(trimmed);
};
