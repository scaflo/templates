import { z } from "zod";
export declare const signUpSchema: {
    body: z.ZodObject<{
        name: z.ZodString;
        password: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>, string, string>;
        email: z.ZodString;
        phone: z.ZodNumber;
        userType: z.ZodEnum<["ADMIN", "SUPER_ADMIN"]>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        phone: number;
        email: string;
        password: string;
        userType: "ADMIN" | "SUPER_ADMIN";
    }, {
        name: string;
        phone: number;
        email: string;
        password: string;
        userType: "ADMIN" | "SUPER_ADMIN";
    }>;
};
export declare const signInSchema: {
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodEffects<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, string, string>, string, string>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        password: string;
    }, {
        email: string;
        password: string;
    }>;
};
//# sourceMappingURL=user.validation.d.ts.map