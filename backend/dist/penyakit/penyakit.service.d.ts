import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { PenyakitRespnse, ReqCreatePenyakit, ReqDeletePenyakit, ReqGetPenyakit, ReqPutPenyakit } from 'src/model/penyakit.model';
import { Paging } from 'src/model/web.model';
export declare class PenyakitService {
    private validationService;
    private prismaService;
    constructor(validationService: ValidationService, prismaService: PrismaService);
    getAll(request: ReqGetPenyakit): Promise<{
        data: PenyakitRespnse[];
        paging?: Paging;
    }>;
    get(id: string): Promise<PenyakitRespnse>;
    create(request: ReqCreatePenyakit): Promise<{
        createdAt: Date;
        name: string;
        id: string;
        image: string;
        description: string;
        solution: string;
    }>;
    put(request: ReqPutPenyakit, id: string): Promise<{
        createdAt: Date;
        name: string;
        id: string;
        image: string;
        description: string;
        solution: string;
    }>;
    delete(request: ReqDeletePenyakit): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
