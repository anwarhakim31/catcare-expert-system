import { PrismaService } from 'src/common/prisma.service';
import { DiagnosisRespnse, jsonDiagnosis, ReqDeleteDiagnosis, ReqGetDiagnosis, ReqPatchDiagnosis } from 'src/model/diagnosis.model';
import { AuthResponse } from 'src/model/auth.model';
import { ValidationService } from 'src/common/validation.service';
import { Paging } from 'src/model/web.model';
export declare class DiagnosisService {
    private validationService;
    private prismaService;
    constructor(validationService: ValidationService, prismaService: PrismaService);
    getAll(request: ReqGetDiagnosis): Promise<{
        data: DiagnosisRespnse[];
        paging?: Paging;
    }>;
    delete(request: ReqDeleteDiagnosis): Promise<import(".prisma/client").Prisma.BatchPayload>;
    create(user: AuthResponse): Promise<DiagnosisRespnse>;
    get(id: string): Promise<{
        disease: JSON;
        symptoms: [] | jsonDiagnosis[];
        status: import(".prisma/client").$Enums.DiagnosisStatus;
        username: string;
        createdAt: Date;
        id: string;
        expired: number;
        scor: number | null;
    }>;
    getDiagnosis(user: AuthResponse): Promise<DiagnosisRespnse[]>;
    patch(id: string, request: ReqPatchDiagnosis): Promise<DiagnosisRespnse>;
    cornJob(): Promise<boolean>;
}
