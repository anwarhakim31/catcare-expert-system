import { DiagnosisStatus } from '@prisma/client';
import { PenyakitRespnse } from './penyakit.model';
export declare class ReqGetDiagnosis {
    page?: number;
    search?: string;
    limit?: number;
    status?: string;
}
export declare class ReqPatchDiagnosis {
    symptoms: any;
    disease?: jsonDiagnosis[];
    status: DiagnosisStatus;
    expired: number;
}
export declare class ReqDeleteDiagnosis {
    selected: string[];
}
export declare class DiagnosisRespnse {
    id?: string;
    symptoms: [] | jsonDiagnosis[];
    scor?: number;
    disease?: PenyakitRespnse | JSON;
    expired: number;
    status: string;
    createdAt: Date;
    username: string;
}
export declare class jsonDiagnosis {
    id: string;
    symptom: string;
    answer: boolean;
}
