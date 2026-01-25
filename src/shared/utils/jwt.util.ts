import { jwtDecode } from "jwt-decode";

export function decodeJWT<T>(token: string): T | null {
  try {
    return jwtDecode<T>(token);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

export function isTokenExpiringSoon(token: string, bufferMinutes: number = 5): boolean {
  const payload = decodeJWT<{ exp?: number }>(token);

  if (!payload || !payload.exp) {
    return true;
  }

  const expirationTime = payload.exp * 1000;
  const currentTime = Date.now();
  const bufferTime = bufferMinutes * 60 * 1000;

  return expirationTime - currentTime <= bufferTime;
}

export function getTokenExpiration(token: string): Date | null {
  const payload = decodeJWT<{ exp?: number }>(token);

  if (!payload || !payload.exp) {
    return null;
  }

  return new Date(payload.exp * 1000);
}
