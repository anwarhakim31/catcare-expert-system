import { GejalaService } from './gejala.service';
import { GejalaRespnse, ReqCreateGejala, ReqPutGejala } from '../model/gejala.module';
import { WebResponse } from '../model/web.model';
import { ReqDeletePenyakit } from '../model/penyakit.model';
export declare class GejalaController {
    private GejalaService;
    constructor(GejalaService: GejalaService);
    getAll(search?: string, page?: number, limit?: number): Promise<{
        success: boolean;
        message: string;
        data: GejalaRespnse[];
        paging: import("../model/web.model").Paging;
    }>;
    create(request: ReqCreateGejala): Promise<WebResponse<GejalaRespnse>>;
    put(request: ReqPutGejala, params: {
        id: string;
    }): Promise<WebResponse<GejalaRespnse>>;
    Delete(request: ReqDeletePenyakit): Promise<WebResponse<{
        name: string;
    }>>;
}
