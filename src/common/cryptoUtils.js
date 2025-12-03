import CryptoJS from "crypto-js";
import { getEncryptKeyAndIv } from "../constants/constants";

const encryptInternal = (data, keyValue, ivValue) => {
  const key = CryptoJS.enc.Latin1.parse(keyValue);
  const iv = CryptoJS.enc.Latin1.parse(ivValue);

  const dataToEncrypt = typeof data === "string" ? data : JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(dataToEncrypt, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });

  return encrypted.toString();
};

const decryptInternal = (encrypted, keyValue, ivValue) => {
  const key = CryptoJS.enc.Latin1.parse(keyValue);
  const iv = CryptoJS.enc.Latin1.parse(ivValue);
  const decrypted = CryptoJS.AES.decrypt(encrypted.trim(), key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const encNewPayload = (rawPayload, env) => {
  const { key, iv } = getEncryptKeyAndIv(env);
  return {
    payload: encryptInternal(rawPayload, key, iv),
  };
};

export const decResPayload = (resPayload, env) => {
  const { key, iv } = getEncryptKeyAndIv(env);
  let decryptedRes = decryptInternal(resPayload, key, iv);
  decryptedRes = decryptedRes.replace(/[^\x20-\x7E]+$/, "");
  return JSON.parse(decryptedRes);
};

export const encryptSocketPayload = (payload, env) => {
  const { key, iv } = getEncryptKeyAndIv(env);
  return encryptInternal(payload, key, iv);
};

export const decryptSocketPayload = (encryptedPayload, env) => {
  try {
    const { key, iv } = getEncryptKeyAndIv(env);
    const { payload } = encryptedPayload;
    const decrypted = decryptInternal(payload, key, iv);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("WebSocket decryption failed:", error);
    return encryptedPayload;
  }
};
