
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Constants } from 'src/common/Constants';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private jwtService: JwtService, private readonly authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) throw new UnauthorizedException();

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: Constants.JWT_Salt
                }
            );

            const userId = payload.sub

            const user = await this.authService.findAccessById(userId);

            if (!user) return false
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}