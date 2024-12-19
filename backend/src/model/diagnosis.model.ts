import { DiagnosisStatus } from '@prisma/client';
import { PenyakitRespnse } from './penyakit.model';

export class ReqGetDiagnosis {
  page?: number;
  search?: string;
  limit?: number;
}

export class ReqPatchDiagnosis {
  symptoms: any;
  disease?: jsonDiagnosis[];
  status: DiagnosisStatus;
  expired: number;
}

export class ReqDeleteDiagnosis {
  selected: string[];
}

export class DiagnosisRespnse {
  id?: string;
  symptoms: [] | jsonDiagnosis[];
  scor?: number;
  disease?: PenyakitRespnse | JSON;
  expired: number;
  status: string;
  createdAt: Date;
  username: string;
}

export class jsonDiagnosis {
  id: string;
  symptom: string;
  answer: boolean;
}
