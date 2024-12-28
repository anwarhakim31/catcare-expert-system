"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenyakitModule = void 0;
const common_1 = require("@nestjs/common");
const penyakit_controller_1 = require("./penyakit.controller");
const penyakit_service_1 = require("./penyakit.service");
let PenyakitModule = class PenyakitModule {
};
exports.PenyakitModule = PenyakitModule;
exports.PenyakitModule = PenyakitModule = __decorate([
    (0, common_1.Module)({
        controllers: [penyakit_controller_1.PenyakitController],
        providers: [penyakit_service_1.PenyakitService],
    })
], PenyakitModule);
//# sourceMappingURL=penyakit.module.js.map