import { v4 as uuidv4 } from "uuid";
import crypto from "node:crypto";

export function GenerateBarcode(): string {
  const uuid = uuidv4();

  // Hash UUID to get strong entropy
  const hash = crypto.createHash("sha256").update(uuid).digest("hex");

  // Convert part of hash to a 10-digit number
  const num = BigInt("0x" + hash.slice(0, 15));
  const mod = 10n ** 10n;

  return (num % mod).toString().padStart(10, "0");
}
