// jwt.guard.ts
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      return false;
    }

    try {
      const payload = this.authService.verifyToken(token);
      request.user = payload; // Attach the payload to the request for later use
      return true;
    } catch (err) {
      return false;
    }
  }
}
