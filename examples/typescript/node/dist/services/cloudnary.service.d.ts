import type { DeleteApiResponse, UploadApiResponse } from "cloudinary";
export declare const uploadImage: (buffer: Buffer) => Promise<UploadApiResponse>;
export declare const getImageUrl: (publicId: string, options?: {
    width?: number;
    height?: number;
    crop?: string;
}) => string;
export declare const deleteImage: (publicId: string) => Promise<DeleteApiResponse>;
//# sourceMappingURL=cloudnary.service.d.ts.map