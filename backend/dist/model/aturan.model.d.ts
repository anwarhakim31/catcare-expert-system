export declare class ReqCreateAturan {
    diseaseId: string;
    symptomId: string;
}
export declare class ReqGetAturan {
    page?: number;
    search?: string;
    limit?: number;
}
export declare class ReqPutAturan {
    diseaseId: string;
    symptomId: string;
}
export declare class ReqDeleteAturan {
    selected: string[];
}
export declare class AturanRespnse {
    id: string;
    symptomId: string;
    diseaseId: string;
    createdAt: Date;
}
