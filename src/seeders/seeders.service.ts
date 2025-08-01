import { Injectable, OnModuleInit } from '@nestjs/common';
import { hashPassword } from 'src/common/Hash';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class SeedersService implements OnModuleInit {
    constructor(private readonly prismaService: PrismaService) { }

    async onModuleInit() {
        await this.seedAccess()
    }

    async seedAccess() {
        const accessCount = await this.prismaService.access.count();

        if (accessCount == 0)
            await this.prismaService.access.create({
                data: {
                    username: 'admin',
                    password: await hashPassword('adm1234')
                }
            });
    }

    async seedUsers(qtd: number = 20, reset: boolean = false) {
        if (reset) await this.prismaService.user.deleteMany();
        await this.prismaService.user.createMany({
            data: Array(qtd).fill('').map(x => {
                const rng = Math.floor(Math.random() * 1000);
                return {
                    name: 'User_' + rng,
                    email: rng + '@mail.com'
                }
            })
        });
    }
}
