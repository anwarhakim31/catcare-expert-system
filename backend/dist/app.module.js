"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const common_module_1 = require("./common/common.module");
const penyakit_module_1 = require("./penyakit/penyakit.module");
const gejala_module_1 = require("./gejala/gejala.module");
const aturan_module_1 = require("./aturan/aturan.module");
const diagnosis_module_1 = require("./diagnosis/diagnosis.module");
const user_module_1 = require("./user/user.module");
const statistic_module_1 = require("./statistic/statistic.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        imports: [
            common_module_1.CommonModule,
            auth_module_1.AuthModule,
            penyakit_module_1.PenyakitModule,
            gejala_module_1.GejalaModule,
            aturan_module_1.AturanModule,
            diagnosis_module_1.DiagnosisModule,
            user_module_1.UserModule,
            statistic_module_1.StatisticModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map