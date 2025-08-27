import { Request, Response, NextFunction } from "express";

export const checkAdminRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  try {
    const token = authHeader.split(" ")[1];
    const user = JSON.parse(Buffer.from(token, "base64").toString("utf8"));

    if (!user.roles || !user.roles.includes("Admin")) {
      return res.status(403).json({ message: "Only admins can update roles" });
    }

    (req as any).user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
