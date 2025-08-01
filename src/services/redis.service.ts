import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';
import IORedis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
    private readonly client: Redis;

    constructor() {
        this.client = new IORedis({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
        });
    }

    getClient(): Redis {
        return this.client;
    }

    async getValue<T>(key: string): Promise<T> {
        return JSON.parse(await this.client.get(key)) as T;
    }

    async setValue(key: string, value: any): Promise<void> {
        const strValue = JSON.stringify(value);
        await this.client.set(key, strValue);
    }

    async flush() {
        await this.client.flushall();
    }

    async onModuleDestroy() {
        await this.client.quit();
    }
}
