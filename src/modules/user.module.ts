import { Module } from '@nestjs/common';
import { UserController } from 'src/controller/user.controller';
import { PrismaService } from 'src/services/prisma.service';
import { UserService } from 'src/services/user.service';
import { RedisModule } from './redis.module';
import { RedisService } from 'src/services/redis.service';
import { AuthModule } from './auth.module';

@Module({
    imports: [RedisModule, AuthModule],
    controllers: [UserController],
    providers: [UserService, PrismaService, RedisService],
    exports: [UserService]
})
export class UserModule { }
