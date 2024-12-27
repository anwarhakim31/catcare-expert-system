import { AturanService } from './aturan.service';
import { AturanRespnse, ReqCreateAturan, ReqDeleteAturan, ReqPutAturan } from '../model/aturan.model';
import { WebResponse } from '../model/web.model';
export declare class AturanController {
    private aturanService;
    constructor(aturanService: AturanService);
    getAll(search?: string, page?: number, limit?: number): Promise<WebResponse<AturanRespnse[]>>;
    create(request: ReqCreateAturan): Promise<WebResponse<{
        name: string;
    }>>;
    put(request: ReqPutAturan, params: {
        id: string;
    }): Promise<WebResponse<AturanRespnse>>;
    delete(request: ReqDeleteAturan): Promise<WebResponse<{
        name: string;
    }>>;
}
