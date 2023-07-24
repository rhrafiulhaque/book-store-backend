import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../config';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: 'Unauthorized: Access token not found',
        });
      }

      let verifiedUser = null;
      try {
        verifiedUser = jwt.verify(
          token,
          config.jwt_secret_key as Secret,
        ) as JwtPayload;
      } catch (error) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: 'Invalid Access token',
        });
      }

      //   req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: 'Forbidden',
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
