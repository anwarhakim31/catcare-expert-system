export class ReqCreateAturan {
  diseaseId: string;
  symptomId: string;
}

export class ReqGetAturan {
  page?: number;
  search?: string;
  limit?: number;
}

export class ReqPutAturan {
  diseaseId: string;
  symptomId: string;
}

export class ReqDeleteAturan {
  selected: string[];
}

export class AturanRespnse {
  id: string;
  symptomId: string;
  diseaseId: string;
  createdAt: Date;
}
