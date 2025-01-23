import { DiagnosisService } from './diagnosis.service';
import { DiagnosisRespnse, ReqDeleteDiagnosis, ReqPatchDiagnosis } from '../model/diagnosis.model';
import { AuthResponse } from '../model/auth.model';
import { WebResponse } from '../model/web.model';
export declare class DiagnosisController {
    private readonly dignosisService;
    constructor(dignosisService: DiagnosisService);
    getAll(search?: string, status?: string, page?: number, limit?: number): Promise<WebResponse<DiagnosisRespnse[]>>;
    delete(request: ReqDeleteDiagnosis): Promise<WebResponse<{
        name: string;
    }>>;
    getDianosisUser(user: AuthResponse): Promise<WebResponse<DiagnosisRespnse[]>>;
    create(user: AuthResponse): Promise<WebResponse<DiagnosisRespnse>>;
    get(params: {
        id: string;
    }): Promise<WebResponse<DiagnosisRespnse>>;
    patch(user: AuthResponse, params: {
        id: string;
    }, request: ReqPatchDiagnosis): Promise<WebResponse<DiagnosisRespnse>>;
    cornJob(): Promise<void>;
}
