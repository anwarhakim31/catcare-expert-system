import { Logger } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { Paging } from '../model/web.model';
import { GejalaRespnse, ReqCreateGejala, ReqDeleteGejala, ReqGetGejala, ReqPutGejala } from '../model/gejala.module';
export declare class GejalaService {
    private validationService;
    private logger;
    private prismaService;
    constructor(validationService: ValidationService, logger: Logger, prismaService: PrismaService);
    getAll(request: ReqGetGejala): Promise<{
        data: GejalaRespnse[];
        paging?: Paging;
    }>;
    create(request: ReqCreateGejala): Promise<{
        symptom: string;
        createdAt: Date;
        id: string;
    }>;
    put(request: ReqPutGejala, id: string): Promise<{
        symptom: string;
        createdAt: Date;
        id: string;
    }>;
    delete(request: ReqDeleteGejala): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
