import { PenyakitService } from './penyakit.service';
import { PenyakitRespnse, ReqCreatePenyakit, ReqDeletePenyakit, ReqPutPenyakit } from 'src/model/penyakit.model';
import { WebResponse } from 'src/model/web.model';
export declare class PenyakitController {
    private penyakitService;
    constructor(penyakitService: PenyakitService);
    getAll(search?: string, page?: number, limit?: number): Promise<WebResponse<PenyakitRespnse[]>>;
    get(params: {
        id: string;
    }): Promise<WebResponse<PenyakitRespnse>>;
    create(request: ReqCreatePenyakit): Promise<WebResponse<{
        name: string;
    }>>;
    put(request: ReqPutPenyakit, params: {
        id: string;
    }): Promise<WebResponse<PenyakitRespnse>>;
    Delete(request: ReqDeletePenyakit): Promise<WebResponse<{
        name: string;
    }>>;
}
