import { Component, OnInit,OnDestroy } from '@angular/core';
import {ConectionService} from '../../core/conection.service';
import { Router, NavigationStart } from '@angular/router';

declare var Autodesk : any;
//declare var viewer : any;
declare var $ : any;
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  constructor( 
    private service : ConectionService,
    private router: Router,
  ) { }
 
  private path:String;
  private viewer:any ;
  private inerpath:String;
  private filePath:string = '3d.svf'
  ngOnInit() {
    
    this.inerpath = this.service.modelPath +this.filePath;
   
    var options = { env: 'Local' };
    var main = this;
    main.viewer = new Autodesk.Viewing.Private.GuiViewer3D($("#MyViewerDiv")[0], {});;
    Autodesk.Viewing.Initializer(options, function () {
      main.viewer.start();
      main.viewer.tearDown();
        //再次初始化Viewr
      main.viewer.setUp(main.viewer.config);
      main.viewer.load(main.inerpath);
      
      

    });
    
  }

  private uploadModel(){
   
    console.log(this.inerpath)
    this.viewer.load(this.inerpath);
 
  }
  private backHome(){
    this.router.navigate(['upload']);
  }
  
  //修改文件路径
  private changeFilePath(){

  }
 
  ngOnDestroy() {
    if (this.viewer) {
      this.viewer.tearDown()
      this.viewer.finish()
      this.viewer = null
  }
    console.log('destory');

  }
  

}
