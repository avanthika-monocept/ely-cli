import apiCall from "../axiosRequest";
import { getBaseUrl, getXApiKey } from "../../constants/constants";
import { VALIDATE_JWT_TOKEN_URL } from "../apiUrls";
import { encNewPayload, decResPayload } from "../../common/cryptoUtils";

export const validateJwtToken = async (
  jwtToken,
  platform,
  userInfo = {},
  env = "uat"
) => {
  try {
    const rawPayload = {
      jwtToken,
      platform,
      userInfo,
    };
    const encryptedPayload = encNewPayload(rawPayload, env);

    const response = await apiCall({
      baseURL: getBaseUrl(env),
      url: VALIDATE_JWT_TOKEN_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwtToken,
        "x-api-key": getXApiKey(env),
        platform,
      },
      data: encryptedPayload,
    });

    if (response?.payload) {
      const decryptedData = decResPayload(response.payload, env);
      console.log("Decrypted validation response:", decryptedData);
      return decryptedData;
    }

    return null;
  } catch (error) {
    console.error("Error validating JWT token:", error);
    throw error;
  }
};
