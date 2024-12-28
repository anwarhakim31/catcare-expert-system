import { StatisticService } from './statistic.service';
export declare class StatisticController {
    private statisticService;
    constructor(statisticService: StatisticService);
    getStatistic(): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    getStatisticHome(): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
}
