import * as express from "express";
import * as jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
  namespace jsonwebtoken {
    interface JwtPayload {
      user?: string;
    }
  }
}
