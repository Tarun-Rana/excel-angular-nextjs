import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExcelConversionService {
  constructor(private httpClient:HttpClient) { }
  
  getJsonData(file:any){
    const form = new FormData();
    form.append('file', file, file.name);
    return this.httpClient.post<any>(`http://localhost:3000/upload`, form);
  }
}
