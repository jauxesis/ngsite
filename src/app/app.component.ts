import { Component, ViewChild, ElementRef } from '@angular/core';

import { ServService } from './service/serv.service';

import * as html2canvas from 'html2canvas';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as IPFS from 'ipfs';
import * as ipfsAPI from 'ipfs-api';
import * as ipfs from 'ipfs-js';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
 

  form: FormGroup;
  @ViewChild('fileInput1') fileInput1: ElementRef;


  constructor(
    public http:Http,
    private fb: FormBuilder,
    public serv:ServService
  ){
    // serv.sayHello();
    // serv.loadFile();
    // this.form = this.fb.group({
    //   file:null
    // });


    

    this.gets();
  }

  gets(){
    // IPFS.repo.init;
    // console.log("ipfs.repo.version:",IPFS.repo.version);
    //ipfs.files.get("QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG",(data)=>{
    
    this.http.get("http://localhost:5001/api/v0/cat?arg=QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG")
    .subscribe(
      (data)=>{
       console.log("ipfscatdata1:",data);
      },
      (e)=>{
       // console.log("ipfserr1:",e)
      }
    )


    // var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http',
    //   "HTTPHeaders": {
    //     "Access-Control-Allow-Headers": [
    //       "X-Requested-With",
    //       "Range"
    //     ],
    //     "Access-Control-Allow-Methods": [
    //       "GET","POST"
    //     ],
    //     "Access-Control-Allow-Origin": [
    //       "*"
    //     ]
    //   }
    // }) // leaving out the arguments will default to these values
    
    // // or connect with multiaddr
    // ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5001')
    
    // // or using options
    // ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'})
    ipfs.setProvider({host: 'localhost', port: '5001'})
    // console.log("apiconf:",ipfs)
    // ipfs.files.get("QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG",(data)=>{
    //   console.log("ipfsdata:",data)
    // });  

    ipfs.cat("QmUVTKsrYJpaxUT7dr9FpKq6AoKHhEM7eG1ZHGL56haKLG",function(err,data){
      console.log("ipfsincatdata:",JSON.stringify(data))
    });


    // console.log("ipfs.repo.stat()",ipfs.repo.stat())
    // .subscribe(
    //   d=>{
    //     console.log(d)
    //   },
    //   e=>{
    //     console.log(e)
    //   }
    // )
  }

  input:any;
  posts(){
    // this.http.post("http://localhost:5001/api/v0/add",{file:this.form.value.file})
    // .subscribe(
    //   d=>{
    //     console.log(d)
    //   },
    //   e=>{
    //     console.log(e)
    //   }
    // )

    console.log(this.input)
    ipfs.addJson(this.input,function(err,data){
      console.log(err)
      console.log(data)
    });
  }

  onFileChange1(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      // console.log(file,event)
      // if(file.size > 1000000){
      //   console.log("File size can not be greater than 1 Mb");
      //   this.form.get('file').setValue(null);
      //   this.fileInput1.nativeElement.value = "";
      //   return false; 
      // }else{
        // console.log(reader)
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.form.get('file').setValue({
            filename: file.name,
            filetype: file.type,
            filesize: file.size,
            value: reader.result.split(',')[1]
          })
          this.input = {
            path:file.name,
            content:reader.result
          }
        };
      // }
    }
  }
  formcall(){
    // console.log(this.form.value)
    this.posts();
  }

  capturescreen(){
    html2canvas(document.body,{logging:false}).then((canvas)=>{
      console.log(canvas);

      var getImage = canvas.toDataURL(); // default is png 
      console.log(getImage)
    })
  }













  

 
  makeissue(){
    
    let doc = {
      _id:"testbcdef@mail.com",
      issues:"Page Level Issues Must be added"
    }
    // this.serv.insertIssues(doc);
    this.serv.letsIssuing("18testbcdef@mail.com",location.href,"myFunc()","Some issues have taken");
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
