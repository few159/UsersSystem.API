import { Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { AuthController } from 'src/controller/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  imports: [
    AuthModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, PrismaService],
  exports: [AuthService]
})
export class AuthModule { }
