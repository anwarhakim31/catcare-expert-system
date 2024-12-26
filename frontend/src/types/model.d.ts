export interface User {
  id?: string;
  username: string;
  fullname: string;
  photo?: string;
  password?: string;
  createdAt?: Date;
}

export interface Disease {
  id?: string;
  name: string;
  image: string;
  description: string;
  solution: string;
  createdAt?: Date;
}

export interface Symptom {
  id?: string;
  symptom: string;
  createdAt?: Date;
}

export interface Rule {
  id?: string;
  symptomId: string;
  diseaseId: string;
  createdAt?: Date;
}

export interface Diagnosis {
  id?: string;
  symptoms?: { id?: string; symptom?: string; answer?: boolean }[];
  scor?: number;
  disease?: Disease[];
  expired: number;
  status?: string;
  createdAt?: Date;
  username?: string;
}

export interface Rule {
  id?: string;
  symptomId: string;
  diseaseId: string;
  createdAt?: Date;
}

export interface Statistic {
  total: {
    user: number;
    disease: number;
    symptom: number;
    diagnosis: number;
  };
  last3month: {
    month: string;
    count: number;
  }[];
  detailedSymptoms: {
    disease: string;
    symptoms: string[];
  }[];
}
