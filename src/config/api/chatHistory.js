import apiCall from "../axiosRequest";
import { CHAT_HISTORY } from "../apiUrls";
import { getBaseUrl, getXApiKey } from "../../constants/constants";
import { encNewPayload, decResPayload } from "../../common/cryptoUtils";
import { stringConstants } from "../../constants/StringConstants";

const MAX_TOKEN_RETRIES = 1;

export const fetchChatHistory = async (
  agentId,
  page = 0,
  size = 10,
  token,
  retryCount = 0,
  platform,
  env = "uat"
) => {
  try {
    const rawPayload = { agentId, page, size, platform };
    const encryptedPayload = encNewPayload(rawPayload, env);

    const response = await apiCall({
      baseURL: getBaseUrl(env),
      url: CHAT_HISTORY,
      method: "POST",
      headers: {
        Authorization: "dummy",
        "x-api-key": getXApiKey(env),
        userId: agentId,
        elyAuthToken: token,
        platform,
      },
      data: encryptedPayload,
    });

    if (response?.payload) {
      const decryptedData = decResPayload(response.payload, env);
      return decryptedData?.data || [];
    }

    return [];
  } catch (error) {
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      retryCount < MAX_TOKEN_RETRIES
    ) {
      throw new Error(stringConstants.tokenExpired);
    }

    console.error("Error fetching chat history:", error);
    throw error;
  }
};
