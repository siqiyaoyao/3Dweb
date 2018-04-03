import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ConfirmComponent } from '../../core/confirm/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";
import { Router, NavigationStart } from '@angular/router';
import { EventEmitter } from 'events';
import {ConectionService} from '../../core/conection.service';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';//http相关服务
const URL = 'http://localhost:8083/api/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  outputs:['outputValue'],//输出属性
})
export class UploadComponent  {
  constructor(
    private dialogService:DialogService,
    private router: Router,
    private service:ConectionService,
    private http:HttpClient, // 可以用http里面的方法
  ) {}
    
  //相关属性
  public modelPath:string;
  public outputValue = new EventEmitter;//发布函数

  //文件上传组件
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  public uploadFile(item) {
    console.log(item);
    item.upload(); // 开始上传
    var upCom = this;
    // 上传
    item.onSuccess = function (response, status, headers) {
        // 上传文件成功
        if (status == 200) {
            // 上传文件后获取服务器返回的数据
            //let tempRes = JSON.parse(response);
            let tempRes = response;
            console.log(tempRes);
           // upCom.modelPath = response;
            //upCom.service.modelPath = response;
            upCom.showConfirm();
        } else {
            // 上传文件后获取服务器返回的数据错误
            alert("");
        }
    };
    
  }
  showConfirm() {
    var main = this;
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
        title:'上传成功', 
        message:'是否进行模型转换'})
        .subscribe((isConfirmed)=>{
            //We get dialog result
            if(isConfirmed) {
              main.getTransfer("http://localhost:8083/api/transfer")             
                //alert('accepted');
            }
            else {
                alert('declined');
            }
        });
    //We can close dialog calling disposable.unsubscribe();
    //If dialog was not closed manually close it by timeout
    /*
    setTimeout(()=>{
        disposable.unsubscribe();
    },10000);
    */
}
getTransfer(url){
  var main = this;
  this.http.get(url).subscribe(
  (res)=>{
    console.log(res);
    main.service.modelPath = res.toString();
    main.router.navigate(['view']);
  },
  /*
  (err)=>{
    alert('failed');
  }
  */
)
}
 /*
  private refresh(name){
    this.model = name;
    this.isPost = true;
    console.log("get all");
  }
  */
}
