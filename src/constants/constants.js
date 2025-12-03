// constants/constants.js

export const ENVIRONMENTS = {
  UAT: "uat",
  PROD: "prod",
};

const UAT_BASE_URL = "https://uatapi.maxlifeinsurance.com/hris";
const PROD_BASE_URL = "https://api.axismaxlife.com/hris";

const X_API_KEY_UAT = "4iNbPS8RzT4G9q7tBp3QZ36FwFBd5GhX6Lrl4oVK";
const X_API_KEY_PROD = "cFtYU8IkzU1lMzQdTKsPs7ouNV22kSnl6nwRq8rk";

const ENCRYPT_KEY_VALUE_UAT = "09876543345678900987654334567890";
const ENCRYPT_IV_VALUE_UAT = "0987654334567890";

const ENCRYPT_KEY_VALUE_PROD = "Uka44ksThgoeKWG8LkjH8lWZ6tVZt17C";
const ENCRYPT_IV_VALUE_PROD = "268f8fb2c5544f8d";

// WebSocket base can also vary per env if required:
const WEBSOCKET_BASE_URL_UAT =
  'wss://rb0rtd86jb.execute-api.ap-south-1.amazonaws.com/uat/?userId=';
const WEBSOCKET_BASE_URL_PROD =
  "wss://6qwasq53he.execute-api.ap-south-1.amazonaws.com/prod/?userId=";

export const getBaseUrl = (env) =>
  env === ENVIRONMENTS.UAT ? UAT_BASE_URL : PROD_BASE_URL;

export const getXApiKey = (env) =>
  env === ENVIRONMENTS.UAT ? X_API_KEY_UAT : X_API_KEY_PROD;

export const getEncryptKeyAndIv = (env) =>
  env === ENVIRONMENTS.UAT
    ? { key: ENCRYPT_KEY_VALUE_UAT, iv: ENCRYPT_IV_VALUE_UAT }
    : { key: ENCRYPT_KEY_VALUE_PROD, iv: ENCRYPT_IV_VALUE_PROD };

export const getWebSocketBaseUrl = (env) =>
  env === ENVIRONMENTS.UAT ? WEBSOCKET_BASE_URL_UAT : WEBSOCKET_BASE_URL_PROD;
