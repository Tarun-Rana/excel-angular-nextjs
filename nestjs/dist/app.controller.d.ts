import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    excelToJson(file: any): any;
    uploadFile(file: any): unknown[];
}
