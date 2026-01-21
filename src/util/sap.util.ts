import { 
  SAP_PRIVATE_BASE_URL, 
  SAP_PUBLIC_BASE_URL, 
  SAP_SERVICES, 
  sapBaseUrl, 
  sapServicesKey 
} from "../config/sap.constants";

/**
 * Builds the full SAP OData service URL based on the requested service
 * and the base URL type (PRIVATE or PUBLIC).
 *
 * Behavior:
 * - Defaults to the base URL specified by the environment variable `USE_PUBLIC_URL`.
 *   - If `USE_PUBLIC_URL="true"`, defaults to PUBLIC base URL.
 *   - Otherwise, defaults to PRIVATE base URL.
 * - If `baseUrl` argument is provided, it overrides the environment setting.
 *
 * @param {sapServicesKey} service - The SAP service key (e.g., "PRODUCTS", "CUSTOMERS", "PRICES").
 * @param {sapBaseUrl} [baseUrl] - Optional override for base URL type ("PRIVATE" | "PUBLIC").
 * @returns {string} The fully constructed SAP service URL.
 *
 * @example
 * Uses .env (USE_PUBLIC_URL)
 * const productsUrl = getSapUrl("PRODUCTS");
 *
 * @example
 * Force PRIVATE, ignoring .env
 * const customersUrl = getSapUrl("CUSTOMERS", "PRIVATE");
 *
 * @example
 * Force PUBLIC, ignoring .env
 * const pricesUrl = getSapUrl("PRICES", "PUBLIC");
 */
export const getSapUrl = (service: sapServicesKey, baseUrl?: sapBaseUrl) => {
  const usePublic = process.env.USE_PUBLIC_URL === "true";
  let resolvedBase: sapBaseUrl = usePublic ? "PUBLIC" : "PRIVATE";
    if (baseUrl) {
    resolvedBase = baseUrl;
  }

  const base = resolvedBase === "PRIVATE" ? SAP_PRIVATE_BASE_URL : SAP_PUBLIC_BASE_URL;
  return `${base}/sap/opu/odata/sap/${SAP_SERVICES[service]}`;
};