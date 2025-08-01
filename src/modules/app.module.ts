import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from 'src/controller/app.controller';
import { AuthController } from 'src/controller/auth.controller';
import { UserController } from 'src/controller/user.controller';
import { AppService } from 'src/services/app.service';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { Constants } from 'src/common/Constants';
import { PrismaService } from 'src/services/prisma.service';
import { RedisModule } from './redis.module';
import { RedisService } from 'src/services/redis.service';
import { SeedersModule } from 'src/seeders/seeders.module';
import { SeedersController } from 'src/seeders/seeders.controller';
import { SeedersService } from 'src/seeders/seeders.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: Constants.JWT_Salt,
      signOptions: { expiresIn: Constants.TokenExpirationTimeMs },
    }),
    AuthModule, UserModule, RedisModule, SeedersModule],
  controllers: [AppController, AuthController, UserController, SeedersController],
  providers: [AppService, AuthService, UserService, PrismaService, RedisService, SeedersService],
})
export class AppModule { }