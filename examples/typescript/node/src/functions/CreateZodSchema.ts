import type { ZodObject, ZodRawShape } from "zod";

export interface ICreateZodSchema<BodyShape extends ZodRawShape = ZodRawShape> {
  body: ZodObject<BodyShape>;
  // params?: ZodObject<ZodRawShape>;
  // query?: ZodObject<ZodRawShape>;
}

export function CreateZodSchema<BodyShape extends ZodRawShape = ZodRawShape>({
  body,
  // params,
  // query,
}: ICreateZodSchema<BodyShape>): ICreateZodSchema<BodyShape> {
  return {
    body: body ,
    // params,
    // query,
  };
}

// import {  ZodObject, ZodRawShape } from "zod";

// export interface ICreateZodSchema<
//   BodyShape extends ZodRawShape,
//   ParamShape extends ZodRawShape = {},
//   QueryShape extends ZodRawShape = {},
// > {
//   body?: ZodObject<BodyShape>;
//   params?: ZodObject<ParamShape>;
//   query?: ZodObject<QueryShape>;
// }

// export function CreateZodSchema<
//   BodyShape extends ZodRawShape,
//   ParamShape extends ZodRawShape = {},
//   QueryShape extends ZodRawShape = {},
// >(schema: {
//   body?: ZodObject<BodyShape>;
//   params?: ZodObject<ParamShape>;
//   query?: ZodObject<QueryShape>;
// }): ICreateZodSchema<BodyShape, ParamShape, QueryShape> {
//   return schema;
// }
