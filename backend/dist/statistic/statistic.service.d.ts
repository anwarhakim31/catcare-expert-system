import { PrismaService } from '../common/prisma.service';
export declare class StatisticService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getStatistic(): Promise<{
        total: {
            disease: number;
            symptom: number;
            user: number;
            diagnosis: number;
        };
        last3month: {
            month: string;
            count: any;
        }[];
        detailedSymptoms: {
            disease: string;
            symptoms: string[];
        }[];
    }>;
    getHome(): Promise<{
        disease: number;
        symptom: number;
    }>;
}
