import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validate = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dataToValidate = {
        ...req.params, // Include route parameters
        ...req.body,   // Include request body
      };

      await schema.validateAsync(dataToValidate, { abortEarly: false });

      next(); // Call the next middleware if validation passes
    } catch (error: any) {
      // Ensure no return value; only send a response
      res.status(400).json({
        message: "Validation error",
        details: error.details.map((detail: any) => detail.message),
      });
    }
  };
};