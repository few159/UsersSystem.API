import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import { comparePasswords, hashPassword } from 'src/common/Hash';
import { Constants } from 'src/common/Constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async login(username: string, password: string) {
        const dbAccessUser = await this.findAccess(username);

        if (!dbAccessUser || !await comparePasswords(password, dbAccessUser.password)) throw new UnauthorizedException();

        const payload = {
            sub: dbAccessUser.id,
            username: dbAccessUser.username
        }

        return {
            accessToken: await this.jwtService.signAsync(payload),
            expiresIn: new Date(new Date().getTime() + (Constants.TokenExpirationTimeMs))
        }
    }

    async registerAccess(username: string, password: string) {
        await this.prisma.access.create({
            data: {
                username,
                password: await hashPassword(password)
            }
        });
    }

    async findAccess(username: string) {
        return await this.prisma.access.findUnique({ where: { username: username } });
    }

    async findAccessById(id: number) {
        return await this.prisma.access.findUnique({ where: { id } });
    }
}
