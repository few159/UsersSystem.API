import { Controller, Post, Param, Query } from '@nestjs/common';
import { SeedersService } from './seeders.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Constants } from 'src/common/Constants';

@Controller('seeders')
export class SeedersController {
    constructor(private readonly seederService: SeedersService) { }

    @ApiBearerAuth(Constants.SecurityName)
    @Post('users')
    async SeedUsers(@Query(':qtd') qtd: number = 20, @Query(':reset') reset: boolean) {
        return this.seederService.seedUsers(qtd, reset);
    }
}
