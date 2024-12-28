export declare class ReqCreateGejala {
    id: string;
    symptom: string;
}
export declare class ReqGetGejala {
    page?: number;
    search?: string;
    limit?: number;
}
export declare class ReqPutGejala {
    id: string;
    symptom: string;
}
export declare class ReqDeleteGejala {
    selected: string[];
}
export declare class GejalaRespnse {
    id: string;
    symptom: string;
    createdAt: Date;
}
