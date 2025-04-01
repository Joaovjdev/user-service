import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      if (errorMessages.some(msg => msg.includes('refresh token'))) {
        return res.status(401).json({ error: 'Invalid refresh token' });
      }
      return res.status(400).json({ errors: errorMessages });
    }

    next();
  };
}; 