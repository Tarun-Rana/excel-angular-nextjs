import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'
import { ExcelConversionService } from 'src/app/services/excel-conversion.service'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  spinnerEnabled = false
  keys: string[]
  dataSheet = new Subject()
  @ViewChild('inputFile') inputFile: ElementRef
  isExcelFile: boolean
  data: any
  constructor (private excelConversionService: ExcelConversionService) {}

  ngOnInit (): void {}
  upload (evt) {
    const target: DataTransfer = <DataTransfer>evt.target
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/)
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = ''
    }
    if (this.isExcelFile) {
      console.log("excel hit")
      this.excelConversionService
        .getJsonData(evt.target.files[0])
        .subscribe((data: any) => {
          this.data = data
          this.keys = Object.keys(data[0])
          this.dataSheet.next(data)
        })
    } else {
      this.inputFile.nativeElement.value = ''
    }
  }
}
