/**
 * Parses a Basic Authorization header into [username, password].
 *
 * @param {string} [authHeader] - The Authorization header value (e.g., "Basic dXNlcjpwYXNz").
 * @returns {[string, string] | null} Tuple of [username, password] if valid, otherwise null.
 *
 * @example
 * parseBasicAuthHeader("Basic dXNlcjpwYXNz");
 * returns ["user", "pass"]
 *
 * @example
 * parseBasicAuthHeader("Bearer token");
 * returns null
 */
export function parseBasicAuthHeader(authHeader?: string): [string, string] | null {
  if (!authHeader?.startsWith("Basic ")) return null;
  
  const base64 = authHeader.split(" ")[1];
  const decoded = Buffer.from(base64, "base64").toString("ascii");
  const [username, password] = decoded.split(":");

  return username && password ? [username, password] : null;
}