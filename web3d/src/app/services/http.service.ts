import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';// 数据流
import { catchError } from 'rxjs/operators';// 操作数据流
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {

  constructor(
    private http:HttpClient,
  ) { }

  getTransfer$(url){
    //this.http.get(url).subscribe()
  }
}
