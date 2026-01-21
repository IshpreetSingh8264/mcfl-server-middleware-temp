
// SAP base URL (just once, reuse for products/customers/prices)
// SAP Development Server Endpoints with ports

// Quality Server Endpoints with ports
export const SAP_PRIVATE_BASE_URL = "";
export const SAP_PUBLIC_BASE_URL = "";

// SAP service endpoints
export const SAP_SERVICES = {
};

// Type for SAP services keys
export type sapServicesKey = keyof typeof SAP_SERVICES;
// Type for SAP base URL options
export type sapBaseUrl = "PRIVATE" | "PUBLIC";
