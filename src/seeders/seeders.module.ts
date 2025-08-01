import { Module } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { SeedersController } from './seeders.controller';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  controllers: [SeedersController],
  providers: [SeedersService, PrismaService],
  exports: [SeedersService]
})
export class SeedersModule { }
