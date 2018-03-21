import { Component, OnInit } from '@angular/core';
import {UploadComponent} from '../upload/upload.component';

declare var Autodesk : any;
//declare var viewer : any;
declare var $ : any;
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor() { }
  private upCom : UploadComponent;

  ngOnInit() {
    var path = this.upCom.modelPath +"/0.svf";
    var options = { env: 'Local' };
    var viewer = new Autodesk.Viewing.Private.GuiViewer3D($("#MyViewerDiv")[0], {});
    Autodesk.Viewing.Initializer(options, function () {
        viewer.start();
        viewer.tearDown();
        //再次初始化Viewr
        viewer.setUp(viewer.config);
        console.log("1111")
        viewer.load(path);
        console.log("2222")

    });
  }

}
