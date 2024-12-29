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
exports.StatisticController = void 0;
const common_1 = require("@nestjs/common");
const statistic_service_1 = require("./statistic.service");
let StatisticController = class StatisticController {
    constructor(statisticService) {
        this.statisticService = statisticService;
    }
    async getStatistic() {
        const statistic = await this.statisticService.getStatistic();
        return {
            success: true,
            message: 'Berhasil mengambil data',
            data: statistic,
        };
    }
    async getStatisticHome() {
        const statistic = await this.statisticService.getHome();
        return {
            success: true,
            message: 'Berhasil mengambil data',
            data: statistic,
        };
    }
};
exports.StatisticController = StatisticController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticController.prototype, "getStatistic", null);
__decorate([
    (0, common_1.Get)('/home'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticController.prototype, "getStatisticHome", null);
exports.StatisticController = StatisticController = __decorate([
    (0, common_1.Controller)('/api/statistic'),
    __metadata("design:paramtypes", [statistic_service_1.StatisticService])
], StatisticController);
//# sourceMappingURL=statistic.controller.js.map