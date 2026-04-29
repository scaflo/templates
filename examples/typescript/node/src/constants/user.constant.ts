export enum USER_STATUS {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
}

export enum USER_ROLE {
  SUPER_ADMIN = "SUPER_ADMIN",
  "USER" = "USER",
}

export interface IRefreshToken {
  tokenHash: string;
  createdAt: Date;
  expiresAt: Date;
}
