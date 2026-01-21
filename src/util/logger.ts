/**
 * Logging utility that prefixes messages with a timestamp and tag name.
 *
 * @param {string} tagName - A short identifier for the log source (e.g., "AUTH", "DB").
 * @param {"log" | "info" | "warn" | "error" | "trace"} [level="log"] - Console log level to use.
 *   - `"log"`: General output
 *   - `"info"`: Informational messages
 *   - `"warn"`: Warnings that might need attention
 *   - `"error"`: Errors or critical issues
 * @param {...unknown[]} messages - The content to log (strings, numbers, objects, etc.).
 *
 * @example
 * logWithTag("AUTH", "info", "User logged in successfully");
 * // Output: [2025-09-25T10:30:00.000Z] [AUTH] User logged in successfully
 *
 * @example
 * logWithTag("SERVER", "error", new Error("Connection failed"));
 * // Output: [2025-09-25T10:30:02.000Z] [SERVER] Error: Connection failed
 */
type LogLevel = "log" | "info" | "warn" | "error" | "trace";

export const logWithTag = (
  tagName: string,
  level: LogLevel = "log",
  ...messages: unknown[]
) => {
  // Generate an ISO 8601 timestamp (UTC, sortable)
  const time = new Date().toISOString();

  // Use the specified console method dynamically
  // Example: console.info(), console.warn(), console.error()
  console[level](`[${time}] [${tagName}] ${level.toUpperCase()}`, ...messages);
};