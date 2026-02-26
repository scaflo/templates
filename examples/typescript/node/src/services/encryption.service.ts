import crypto from "node:crypto";
import envConfig from "$/config/env.config.js";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;

/**
 * Encrypts a plain text string using AES-256-GCM.
 * Returns a combined string: iv:authTag:encryptedData (all hex-encoded).
 */
export function encrypt(text: string): string {
  const key = Buffer.from(envConfig.ENCRYPTION_KEY, "hex");
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}

/**
 * Decrypts an encrypted string (iv:authTag:encryptedData format).
 * Returns the original plain text.
 */
export function decrypt(encryptedText: string): string {
  const key = Buffer.from(envConfig.ENCRYPTION_KEY, "hex");
  const [ivHex, authTagHex, encrypted] = encryptedText.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

/**
 * Checks if a value looks like it's already encrypted (iv:authTag:data format).
 */
export function isEncrypted(value: string): boolean {
  const parts = value.split(":");
  return parts.length === 3 && parts[0].length === IV_LENGTH * 2;
}
