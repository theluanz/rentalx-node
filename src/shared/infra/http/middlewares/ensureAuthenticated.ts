import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  iat: number;
  exp: number;
}

async function EnsureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token is missing", 401);
  }
  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(
      token,
      "1201c743536f83af6c77c87be48ca057"
    ) as IPayload;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("User not found", 401);
    }

    request.user = {
      id: user_id,
    };
  } catch {
    throw new AppError("Invalid Token", 401);
  }

  next();
}

export { EnsureAuthenticated };
