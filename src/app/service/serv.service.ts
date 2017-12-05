import { Injectable } from '@angular/core';
import { Http, Response, HttpModule }  from '@angular/http';
import 'rxjs/add/operator/map';

import * as file from 'file-system';
// import * as fs from 'fs';
import * as Raven from 'raven-js';

import PouchDB from 'pouchdb';

@Injectable()
export class ServService {

  pdb:any;
  constructor(
    public http:Http
  ) { 

    this.pdb = new PouchDB("http://45.55.211.36:5984/list/");

    this.getData();
  } 

  getData(){
    this.pdb.allDocs({include_docs: true}).then(function (doc) {
      // for (var i in doc) {
      //   if(doc.rows[i].key="abcd@mail.com"){
          console.log(doc);
      //   }
      // }
      
    });
  }

  insertIssues(doc){

    // this.pdb.post({
    //   name:'alexpa',
    //   age:24
    // },(err,result)=>{
    //   if(err){
    //     console.log("inerr",err)
    //   }else{
    //     console.log(result)
    //   }
    // });

    // console.log("inserting",doc)
    this.pdb.put(doc).then(
      d =>{
        console.log(d,"recorded issue")
      }
    ).catch((e)=>{
      // console.info("inthen:",e)
      if(e.name == "conflict"){
        console.log("im conflict","call another update")
        this.updateIssue(doc._id);
      }else{
        console.error("error",e)
      }
    });
    // return new Promise((resolve,reject)=>{
    //     this.pdb.put(doc).then(
    //       d =>{
    //         // console.log(d,"recorded issue")
    //         resolve(d)
    //       }
    //     ).catch(function(e){
    //       // if(e.name == "conflict"){
    //       //   console.log("im conflict","call another update")
    //       // }else{
    //       //   console.error("error",e.error)
    //       // }
    //       reject(e)
    //     });
    //   })
  }
  updateIssue(id){
    this.pdb.get(id).then((arr) =>{
      console.log("then1",arr);
      // if (arr.name === 'not_found') {
      //   console.log("notfound",arr.name)
      //   // return {
      //   //   _id: 'config',
      //   //   background: 'blue',
      //   //   foreground: 'white',
      //   //   sparkly: 'false'
      //   // };
      // } else { // hm, some other error
      //   throw arr;
      // }
      arr.name = {
        _id:'issue1',
        tracker:'Issue tracker1 in page'
      };
      return this.pdb.put(arr);
    }).then( (configDoc) =>{
      console.log("then",configDoc)
      // sweet, here is our configDoc
    }).catch((err) =>{
      console.log("catch",err)
      // handle any errors
    });
  }



  sayHello(){
    console.log("Hello")
    let a = file;
    // console.log(file)
    // this.copyFile();
    let say = JSON.stringify({
      id:'yuityuifdshghflkjsglfjksdjklfsldjkf',
      email:'sdf2sdf@fg.df',
      message:'caught in function'
    });
    // this.handleError("says error");

    // this.http.get("http://45.55.211.36:5984/albums/6e1295ed6c29495e54cc05947f18c8af")
    // .subscribe(
    //   d=>{
    //     console.log(d)
    //   },
    //   er=>{
    //     console.error(er)
    //   }
    // );
    

    //db init
    var db = new PouchDB("http://45.55.211.36:5984/list/");
// ,{
//       // auth: {
//       //   username: 'masscryptoken.io',
//       //   password: 'rajserver12'
//       // }
//     }
    //db info
    db.info().then(function (info) {
      // console.log("dbdata:",info);
    })


    //table info get
    //db.get("")
    db.allDocs()
    .then(
      (d)=>{
        // console.log("tabledata:",d)
      },
      (e)=>{
        // console.log(e)
      }
    )

    db.get('mittens', function (error, doc) {
      if (error) {
        // oh noes! we got an error
        // console.log(error)
      } else {
        // console.warn(doc)
        // okay, doc contains our document
      }
    });

    // db.bulkDocs([
    //   {title : 'Lisa Says'},
    //   {title : 'Space Oddity'}
    // ]).then(function (result) {
    //   // handle result
    // }).catch(function (err) {
    //   console.log(err);
    // });
  
    db.bulkDocs([
      {title : 'Lisa Says', _id: 'doc1'},
      {title : 'Space Oddity', _id: 'doc2'}
    ]).then(function (result) {
      // handle result
    }).catch(function (err) {
      // console.log(err);
    });
    
    // db.put({
    //     _id: 'mittens',
    //     occupation: 'kitten',
    //     cuteness: 9.0
    // }).then(function () {
    //   return db.put({
    //     _id: 'katie',
    //     occupation: 'kitten',
    //     cuteness: 7.0
    //   });
    // }).then(function () {
    //   return db.put({
    //     _id: 'felix',
    //     occupation: 'kitten',
    //     cuteness: 8.0
    //   });
    // });
    // db.put(doc);

    // //table obj update
    // db.get('mittens').then(function (doc) {
      
    //   doc = {
    //       _id: 'u1@mail.ocm',
    //       occupation: 'kitten',
    //       cuteness: 9.0
        
    //   }
    //   return db.put(doc);
    // }).then(function () {
    //   // fetch mittens again
    //   return db.put({
    //     _id: 'u2@gmail.com',
    //     occupation: 'kitten23',
    //     cuteness: 7.0
    //   });
    //   // return db.get("list");
    // }).then(function (doc) {
    //   console.log(doc);
    // });

    //file sys
    // var documents = file.knownFolders.documents();
    // console.warn(documents)
    // var path = file.path.join(documents.path, "FileFromPath.txt");
    // var file = file.File.fromPath(path);
    
    // // Writing text to the file.
    // file.writeText("Something")
    //     .then(function () {
    //         // Succeeded writing to the file.
    //     }, function (error) {
    //         // Failed to write to the file.
    //     });
  }

  handleError(err:any) : void {
    Raven.captureException(err);
  }
 
  mapFile(fileOb){
    return this.http.get(fileOb).map(this.extractData);
  }

  extractData(res: Response){
    let body = res.json();
    return body || {};
  }

  loadFile(){
    let csv = "assets/data/main.csv";
    let json = "assets/data/mainjson.json";
    
    this.http.get(csv)
    .subscribe(
      d=>{
        // console.info(d)
      },
      e=>{
        // console.error(e)
      }
    );

    this.mapFile(json)
    .subscribe(
      d=>{
        // let dd = JSON.parse(JSON.stringify(d));
        // let par = JSON.parse(dd._body);
        // console.info("Data:",d)
      },
      e=>{
        // console.error(e)
      }
    );
  }

  copyFile(){
    let f = "assets/data/mainjson.json";
    file.copyFile(f,"assets/data/mainjson2.json",{
      done:()=>{
        // console.log("done")
      },
      process:()=>{
        // console.log("process")
      }
    });
  }
}
