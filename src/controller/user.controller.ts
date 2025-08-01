import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDTO, UpdateUserDTO, UserFilterDTO } from '../interfaces/IUser';
import { PaginationQuery } from 'src/interfaces/IPagination';
import { AuthGuard } from 'src/guards/auth.guard';
import { Constants } from 'src/common/Constants';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth(Constants.SecurityName)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async findMany(@Query() query: PaginationQuery, @Query() filter: UserFilterDTO) {
        return this.userService.findMany(query, filter);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @Post()
    async create(@Body() data: Array<CreateUserDTO>) {
        return this.userService.create(data);
    }

    @Put()
    async update(@Body() data: UpdateUserDTO) {
        return this.userService.update(data);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.userService.remove(id);
    }
}
