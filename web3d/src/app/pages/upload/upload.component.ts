import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ConfirmComponent } from '../../core/confirm/confirm.component';
import { DialogService } from "ng2-bootstrap-modal";
import { Router, NavigationStart } from '@angular/router';
const URL = 'http://localhost:8083/api/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent  {
  constructor(
    private dialogService:DialogService,
    private router: Router,) {}
    
  //相关属性
  public modelPath:string;

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
            upCom.modelPath = response;
            upCom.showConfirm();
        } else {
            // 上传文件后获取服务器返回的数据错误
            alert("");
        }
    };
    
  }
  showConfirm() {
    var upCom = this;
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
        title:'上传成功', 
        message:'是否进行模型预览'})
        .subscribe((isConfirmed)=>{
            //We get dialog result
            if(isConfirmed) {
              this.router.navigate(['view']);
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
 /*
  private refresh(name){
    this.model = name;
    this.isPost = true;
    console.log("get all");
  }
  */
}
