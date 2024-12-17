export class ReqCreatePenyakit {
  id: string;
  name: string;
  image: string;
  description: string;
  solution: string;
}

export class ReqGetPenyakit {
  page?: number;
  search?: string;
  limit?: number;
}

export class ReqPutPenyakit {
  id: string;
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
