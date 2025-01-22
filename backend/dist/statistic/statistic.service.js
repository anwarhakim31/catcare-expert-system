"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma.service");
let StatisticService = class StatisticService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getStatistic() {
        const disease = await this.prismaService.disease.count();
        const symptom = await this.prismaService.symptom.count();
        const user = await this.prismaService.user.count({
            where: {
                isAdmin: false,
            },
        });
        const diagnosis = await this.prismaService.diagnosis.count({
            where: {
                status: 'finish',
                user: {
                    isAdmin: false,
                },
            },
        });
        const now = new Date();
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(now.getMonth() - 2);
        const diagnosisByMonth = await this.prismaService.diagnosis.groupBy({
            by: ['createdAt'],
            _count: {
                id: true,
            },
            where: {
                status: 'finish',
                createdAt: {
                    gte: new Date(threeMonthsAgo.getFullYear(), threeMonthsAgo.getMonth(), 1),
                    lte: new Date(now.getFullYear(), now.getMonth() + 1, 0),
                },
                user: {
                    isAdmin: false,
                },
            },
        });
        const groupedData = diagnosisByMonth.reduce((acc, curr) => {
            const date = new Date(curr.createdAt);
            const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
            acc[key] = (acc[key] || 0) + curr._count.id;
            return acc;
        }, {});
        const chartData = Array.from({ length: 3 }, (_, index) => {
            const month = new Date(now.getFullYear(), now.getMonth() - (2 - index), 1);
            const monthKey = `${month.getFullYear()}-${month.getMonth() + 1}`;
            const monthName = month.toLocaleDateString('id-ID', { month: 'long' });
            return {
                month: monthName,
                count: groupedData[monthKey] || 0,
            };
        });
        const symptomByDisease = await this.prismaService.rule.groupBy({
            by: ['diseaseId'],
            _count: {
                symptomId: true,
            },
        });
        const detailedSymptoms = await Promise.all(symptomByDisease.map(async (group) => {
            const disease = await this.prismaService.disease.findUnique({
                where: { id: group.diseaseId },
            });
            const symptoms = await this.prismaService.symptom.findMany({
                where: {
                    rules: {
                        some: { diseaseId: group.diseaseId },
                    },
                },
            });
            return {
                disease: disease.name,
                symptoms: symptoms.map((s) => s.id),
            };
        }));
        return {
            total: {
                disease,
                symptom,
                user,
                diagnosis,
            },
            last3month: chartData,
            detailedSymptoms,
        };
    }
    async getHome() {
        const disease = await this.prismaService.disease.count();
        const symptom = await this.prismaService.symptom.count();
        return { disease, symptom };
    }
    async getModule() {
        const diseases = await this.prismaService.disease.findMany({
            select: {
                name: true,
                modus: true,
            },
        });
        const colors = [
            'hsl(var(--chart-1))',
            'hsl(var(--chart-2))',
            'hsl(var(--chart-3))',
            'hsl(var(--chart-4))',
            'hsl(var(--chart-5))',
        ];
        const chartData = diseases.map((disease, index) => ({
            disease: disease.name,
            modus: disease.modus,
            fill: colors[index % colors.length],
        }));
        return chartData;
    }
};
exports.StatisticService = StatisticService;
exports.StatisticService = StatisticService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StatisticService);
//# sourceMappingURL=statistic.service.js.map