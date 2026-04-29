import { Types } from "mongoose";

export type RefIdLike =
  | Types.ObjectId
  | string
  | null
  | undefined
  | Record<string, unknown>
  | {
      _id?: Types.ObjectId | string | null | undefined;
    }
  | {
      id?: Types.ObjectId | string | null | undefined;
    };

const isObjectId = (value: unknown): value is Types.ObjectId =>
  value instanceof Types.ObjectId;

type HexStringLike = {
  toHexString: () => string;
};

const hasRefKey = <K extends "_id" | "id">(
  value: unknown,
  key: K,
): value is Record<K, Types.ObjectId | string | null | undefined> =>
  typeof value === "object" && value !== null && key in value;

const hasToHexString = (value: unknown): value is HexStringLike =>
  typeof value === "object" &&
  value !== null &&
  "toHexString" in value &&
  typeof value.toHexString === "function";

export const toRefIdString = (value: RefIdLike): string => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (isObjectId(value)) return value.toHexString();
  if (hasToHexString(value)) {
    return value.toHexString();
  }
  if (hasRefKey(value, "_id")) return toRefIdString(value._id);
  if (hasRefKey(value, "id")) return toRefIdString(value.id);
  return "";
};

export const sameRefId = (left: RefIdLike, right: RefIdLike): boolean =>
  toRefIdString(left) === toRefIdString(right);
