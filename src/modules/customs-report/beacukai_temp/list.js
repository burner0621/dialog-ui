import { inject } from "aurelia-framework";
import { Service } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import { result } from "underscore";
import { data } from "jquery";
import { push } from "../../../routes/general";
// import { json } from "../../../../node_modules/aurelia-fetch-client/dist/aurelia-fetch-client";
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(Router, Service)
export class List {

  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  controlOptions = {
    label: {
        length: 2
    },
    control: {
        length: 5
    }
};


  contextCallback(event) {
    
  }

  upload() {
    this.router.navigateToRoute("upload");
  }

  search(){
    this.searching();
  }

  searching() {

        this.service.search()
            .then(result => {
               this.data=result.data;     

               this.FillTable();
            });
            
    }

  FillTable(){
    let columns = [];
    columns.push({ field: 'isEdit', title: '',checkbox: true, sortable: false, });
    columns.push({ field: 'noAju', title: 'No Aju' });
    columns.push({ field: 'bcNo', title: 'No Daftar' });
    columns.push({ field: 'tglBCNO', title: 'Tgl BC No',formatter: value => moment(value).format("DD MMM YYYY") });
    columns.push({ field: 'namaSupplier', title: 'Nama Supplier' });

    var bootstrapTableOptions = {
      columns: columns,
      data: this.data,
      fixedColumns: true,
      fixedNumber: 1
    };


    $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);
  }

  reset() {
    this.data = null;
    this.date = "";
    this.saveCallback.disabled = false;
    this.disabled = false;
    $(this.table).bootstrapTable('destroy');
}


save(){
  this.error = {};
    if (!this.date || this.date == "Invalid Date")
            this.error.date = "Tanggal Datang harus diisi";
    
            if (Object.getOwnPropertyNames(this.error).length === 0) {
              // this.flag = true;
              // this.info.page = 1;
              // this.info.total=0;
              this.changeDate();
          }

            
}


  changeDate(){
    var dataIds=[];
    this.data.forEach(s=>{
        if(s.isEdit){
          s.tglDatang = this.date ? moment(this.date).format("YYYY-MM-DD") : null;
          dataIds.push(s);
        }
    })
  
    if(dataIds.length==0){
        alert("Belum ada data yang dipilih");
    }
    else{

      var dataUpdate={};
      dataUpdate.Ids = dataIds;

      console.log(dataUpdate.Ids);

      var endpoint = 'PostBeacukai';
            var request = {
                method: 'PUT',
                headers: {
                },
                body: json(dataUpdate.Ids)
            }; 

            var promise = this.service.endpoint.client.fetch(endpoint, request);

      this.service.publish(promise);

      return promise.then((response) => {

        var resultPromise = [];
        if (response.status == 200) {
           alert("Data berhasil disimpan");
            this.service.publish(promise);
            this.search();
            // this.list();

          
        }
        else if (response.status == 400) {
            this.disabled = false;
            response.json()
                .then(result => {
                    alert(result.message);
                });
                
                this.search();
            this.service.publish(promise);
        }
        else if (response.status == 500) {
          this.disabled = false;
          alert("Tanggal Datang Belum Di input");   
          this.router.navigateToRoute('list');
          this.service.publish(promise);
      }
    })
    
  }
}

  saveCallback(event) {

    this.disabled = true;

    var e = {};
    var formData = new FormData();
    var header = new Headers();
 
    var fileInput = document.getElementById("fileCsv");
    var fileList = fileInput.files;
    if (fileList[0] == undefined) {
        e.file = "File Path harus dipilih";
        this.error = e;
    } else {
        formData.append("file", fileList[0]);

        header.append("Access-Control-Allow-Headers", "Authorization, Content-Type");
        header.append("Access-Control-Allow-Origin", "*");
        header.append("content-type", "application/json; charset=utf-8");
        // header.append("Access-Control-Allow-Origin","http://localhost:9000");


        var endpoint = 'UploadPB';
        var request = {
            method: 'POST',
            headers: {

            }
            ,
            body: formData
        };

        var promise = this.service.endpoint.client.fetch(endpoint, request);
        this.service.publish(promise);

        return promise.then((response) => {
            var resultPromise = [];
            if (response.status == 200) {
                this.service.publish(promise);
                this.search();

              
            }
            else if (response.status == 400) {
                this.disabled = false;
                response.json()
                    .then(result => {
                        alert(result.message);
                    });
                this.router.navigateToRoute('list');
                this.service.publish(promise);
            }
           
        })
        
    }
  }

}
