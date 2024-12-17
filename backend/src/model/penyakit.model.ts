export class ReqCreatePenyakit {
  name: string;
  image: string;
  description: string;
  solution: string;
}

export class ReqGetPenyakit {
  page?: number;
  search?: string;
  limit?: number;
  total?: number;
  totalPage?: number;
}

export class ReqPutPenyakit {
  name: string;
  image: string;
  description: string;
  solution: string;
}

export class ReqDeletePenyakit {
  selected: string[];
}

export class PenyakitRespnse {
  id: string;
  name: string;
  image: string;
  description: string;
  solution: string;
}
