import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {
    var options = { env: 'Local' };
    var viewer = new Autodesk.Viewing.Private.GuiViewer3D($("#MyViewerDiv")[0], {});
    Autodesk.Viewing.Initializer(options, function () {
        viewer.start();
        viewer.tearDown();
        //再次初始化Viewr
        viewer.setUp(viewer.config);
        console.log("1111")
        viewer.load('/assets/models/test/0/0.svf');
        console.log("2222")

    });
  }

}
