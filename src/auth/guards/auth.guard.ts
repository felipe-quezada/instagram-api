import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants/jwt.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      const expirationTime = payload.exp * 1000;
      const timeUntilExpiration = expirationTime - Date.now();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { exp, iat, ...newPayload } = payload;

      if (timeUntilExpiration < 15 * 60 * 1000) {
        const newToken = await this.jwtService.signAsync(newPayload);
        request.res.setHeader('New-Token', newToken);
      }

      console.log(timeUntilExpiration);

      request.user = payload;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
