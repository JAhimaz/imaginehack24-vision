type ENV_TYPES = "development" | "production";

export const env = "development" as ENV_TYPES;
// export const env = "production" as ENV_TYPES;

export const DATA_API = env === "production" ? "" : "http://localhost:8080";
export const CLIENT_URL = env === "production" ? "" : "http://localhost:3000";