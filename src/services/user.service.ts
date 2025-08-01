import { Injectable, UseGuards } from '@nestjs/common';
import { ICreateUserDTO, IUpdateUserDTO, UserFilterDTO } from '../interfaces/IUser';
import { IPagination, PaginationQuery } from 'src/interfaces/IPagination';
import { User } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { RedisService } from './redis.service';
import { AdminGuard } from 'src/guards/Admin.guard';

@UseGuards(AdminGuard)
@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly redisService: RedisService
    ) { }

    async create(data: Array<ICreateUserDTO>) {
        await this.redisService.flush();
        return this.prisma.user.createMany({ data });
    }

    async findMany(pagination: PaginationQuery, { name }: UserFilterDTO): Promise<IPagination<User>> {
        const cacheKey = `users_${pagination.page}_${pagination.pageSize}${JSON.stringify(pagination.order) !== '{}' ? '_' + (pagination.order.column + '_' + pagination.order.flow) : ''}${name ?? ''}`;
        var cacheResult = await this.redisService.getValue<IPagination<User>>(cacheKey);
        if (cacheResult) return cacheResult;

        const where: any = {};
        if (name) {
            where.name = { contains: name, mode: 'insensitive' };
        }

        const result = {
            data: await this.prisma.user.findMany({
                where,
                skip: (pagination.page - 1) * pagination.pageSize,
                take: pagination.pageSize,
                orderBy: { [pagination.order?.column ?? 'id']: pagination.order?.flow ?? 'asc' }
            }),
            total: await this.prisma.user.count({where}),
            page: pagination.page,
            pageSize: pagination.pageSize,
        };

        await this.redisService.setValue(cacheKey, result);
        return result;
    }

    async findOne(id: number) {
        await this.redisService.flush();
        return await this.prisma.user.findUnique({ where: { id } });
    }

    async update(data: IUpdateUserDTO) {
        await this.redisService.flush();
        return await this.prisma.user.update({ where: { id: data.id }, data: { ...data } });
    }

    async remove(id: number) {
        await this.redisService.flush();
        return await this.prisma.user.delete({ where: { id } });
    }
}
