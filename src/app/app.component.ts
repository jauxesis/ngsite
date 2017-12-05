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
    html2canvas(document.body,{logging:false}).then((canvas)=>{
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
    
    let doc = {
      _id:"testbcdef@mail.com",
      issues:"Page Level Issues Must be added"
    }
    // this.serv.insertIssues(doc);
    this.serv.updateIssue("18testbcdef@mail.com");
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
