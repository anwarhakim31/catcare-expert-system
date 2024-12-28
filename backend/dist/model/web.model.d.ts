export interface WebResponse<T> {
    success?: boolean;
    message?: string;
    data?: T;
    paging?: Paging;
}
export declare class Paging {
    limit: number;
    totalPage: number;
    page: number;
    total: number;
}
