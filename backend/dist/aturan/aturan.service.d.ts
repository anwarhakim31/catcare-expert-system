import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { ReqCreateAturan, ReqDeleteAturan, ReqGetAturan, ReqPutAturan } from 'src/model/aturan.model';
export declare class AturanService {
    private prismaService;
    private validationService;
    constructor(prismaService: PrismaService, validationService: ValidationService);
    getAll(request: ReqGetAturan): Promise<{
        data: ({
            symptom: {
                symptom: string;
                createdAt: Date;
                id: string;
            };
            disease: {
                createdAt: Date;
                name: string;
                id: string;
                image: string;
                description: string;
                solution: string;
            };
        } & {
            createdAt: Date;
            id: string;
            diseaseId: string;
            symptomId: string;
        })[];
        paging: {
            total: number;
            page: number;
            limit: number;
            totalPage: number;
        };
    }>;
    create(request: ReqCreateAturan): Promise<{
        createdAt: Date;
        id: string;
        diseaseId: string;
        symptomId: string;
    }>;
    put(request: ReqPutAturan, id: string): Promise<{
        createdAt: Date;
        id: string;
        diseaseId: string;
        symptomId: string;
    }>;
    delete(request: ReqDeleteAturan): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
