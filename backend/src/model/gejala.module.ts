export class ReqCreateGejala {
  id: string;
  symptom: string;
}

export class ReqGetGejala {
  page?: number;
  search?: string;
  limit?: number;
}

export class ReqPutGejala {
  id: string;
  symptom: string;
}

export class ReqDeleteGejala {
  selected: string[];
}

export class GejalaRespnse {
  id: string;
  symptom: string;
  createdAt: Date;
}
