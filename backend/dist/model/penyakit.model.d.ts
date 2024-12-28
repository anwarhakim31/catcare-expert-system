export declare class ReqCreatePenyakit {
    id: string;
    name: string;
    image: string;
    description: string;
    solution: string;
}
export declare class ReqGetPenyakit {
    page?: number;
    search?: string;
    limit?: number;
}
export declare class ReqPutPenyakit {
    id: string;
    name: string;
    image: string;
    description: string;
    solution: string;
}
export declare class ReqDeletePenyakit {
    selected: string[];
}
export declare class PenyakitRespnse {
    id: string;
    name: string;
    image: string;
    description: string;
    solution: string;
}
