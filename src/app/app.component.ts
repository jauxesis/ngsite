import { Component } from '@angular/core';

import { ServService } from './service/serv.service';

import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';



  capturescreen(){
    html2canvas(document.body).then((canvas)=>{
      console.log(canvas);

      var getImage = canvas.toDataURL(); // default is png 
      console.log(getImage)
    })
  }













  constructor(
    public serv:ServService
  ){
    // serv.sayHello();
    serv.loadFile();
  }


  makeissue(){
    html2canvas(document.body,{
      logging:false
    }).then(function(canvas) {
        console.log(canvas)
        var d = canvas.toDataURL();// "image/png"
        console.log("detail",d)
        // document.body.appendChild(canvas);
    })
    // let doc = {
    //   _id:"testbcdef@mail.com",
    //   description:"Code failed due to data error in page.",
    //   page:location.href
    // }
    // this.serv.insertIssues(doc);
    // .then(
    //   d=>{
    //     console.log(d)
    //   },
    //   e=>{
    //     console.log(e)
    //   }
    // );
  }
}
