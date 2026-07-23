import jwt from "jsonwebtoken";
import { JWTPayload } from "@/types";

const SECRET_KEY = process.env.JWT_SECRET || "bhoomiputhrudu_secret";

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, SECRET_KEY) as JWTPayload;
}

export function getTokenFromHeaders(request: Request): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return null;
}
