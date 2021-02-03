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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const app_service_1 = require("./app.service");
const XLSX = require("xlsx");
const fs = require("fs");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    excelToJson(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            / read workbook /;
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            / grab first sheet /;
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            / save data /;
            const data = XLSX.utils.sheet_to_json(ws);
        };
        reader.readAsBinaryString(file);
    }
    uploadFile(file) {
        console.log(file);
        const data = fs.readFileSync('./upload/' + file.filename);
        const wb = XLSX.read(data, { type: 'buffer' });
        console.log(wb);
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const result = XLSX.utils.sheet_to_json(ws);
        console.log(result);
        return result;
    }
};
__decorate([
    common_1.Post('/excel'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], AppController.prototype, "excelToJson", null);
__decorate([
    common_1.Post('upload'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', { dest: './upload' })),
    __param(0, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "uploadFile", null);
AppController = __decorate([
    common_1.Controller('/'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map