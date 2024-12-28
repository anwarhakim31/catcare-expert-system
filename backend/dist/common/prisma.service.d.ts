import { PrismaClient, Prisma } from '@prisma/client';
import { OnModuleInit } from '@nestjs/common';
export declare class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, string> implements OnModuleInit {
    constructor();
    onModuleInit(): void;
}
