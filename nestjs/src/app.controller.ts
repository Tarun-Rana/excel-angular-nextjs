import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AppService } from './app.service'
import * as XLSX from 'xlsx'
import * as fs from 'fs'

@Controller('/')
export class AppController {
  constructor (private readonly appService: AppService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{dest:'./upload'}))
  uploadFile (@UploadedFile() file) {
    console.log(file)
    const data = fs.readFileSync('./upload/'+file.filename); 
      const wb: XLSX.WorkBook = XLSX.read(data, {type: 'buffer'});
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const result = XLSX.utils.sheet_to_json(ws);
      return result;
  }
  
}
