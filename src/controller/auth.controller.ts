import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AdminGuard } from 'src/guards/Admin.guard';
import { AccessDto } from 'src/interfaces/IAccess';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginBody: AccessDto) {
        return await this.authService.login(loginBody.username, loginBody.password)
    }

    // @UseGuards(AdminGuard)
    @Post('register')
    async registerAccess(@Body() loginBody: AccessDto) {
        return await this.authService.registerAccess(loginBody.username, loginBody.password)
    }
}
