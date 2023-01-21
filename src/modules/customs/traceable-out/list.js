
import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Dialog } from './../../../au-components/dialog/dialog';
var bcnoLoader = require('../../../loader/traceable-out-bc-loader');


@inject(Service,Dialog)
export class List {
    info = { page: 1,size:25};
    constructor(service,dialog) {
        this.service = service;

        this.flag = false;
        this.dialog = dialog;
        this.today = new Date();
        this.error = {};
    }
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    bind(context) {
        // console.log(context);
        this.context = context;
        // this.isShowingMasuk = false;
        // this.isShowingKeluar = false;
        // this.hasBUM = false;
        // this.hasBUK = false;
    }


    attached() {
    }

    activate() {
    }

    // filterQuery={
    //     "filter":"BCNo"
    // }
    // search(){
    //     this.info.page = 1;
    //     this.info.total = 0;
    //     this.searching();
    // }
    
    
    searching() {
        if(!this.BCNo){
            console.log(this.BCNo)
            alert("No Dokumen harus Diisi");
        }else{
        let args = {
            // page: this.info.page,
            // size: this.info.size,
            bcno : this.BCNo 
            //dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            //dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
        }
        this.service.search(args)
                .then(result => {
                    this.rowCount=[];
                   
                    console.log(result);
                    var datas=[];
                    var datadetail=[];
                    var index=0;  
                    for(var _data of result.data){
                        var ro =_data.RO;


                        if (_data.rincian != null)
                        {

                            for(var _data1 of _data.rincian){
                            datadetail.push(_data1);
                            }
                        }

                        // this.service.search2(ro)
                        //     .then(result2 => {
                        //         this.rowCount=[];
                        //         var datas2=[];
                        //         var index=0;  
                        //         for(var _data2 of result2){
                        //         datadetail.push(_data2);
                        //         }
                        //     })   
                   
                        datas.push(_data);
                     
                    }
                     //this.info.total= result.info.total;
                     this.data = datas;
                     this.data2 = datadetail;
                    // console.log(this.data2);
                })
            }

        // this.service.search2(args)
        //         .then(result => {
        //             this.rowCount=[];
                   
        //             console.log(result);
        //             var datas2=[];
        //             var index=0;  
        //             for(var _data of result.data){
                        
                        
        //             //_data.priceTotal=_data.priceTotal.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
        //             //console.log(this.rowCount);
        //             //console.log(rowDoc);
        //             //console.log(_data);
        //             datas2.push(_data);
                     
        //             }
        //              //this.info.total= result.info.total;
        //              this.data2 = datas2;
        //              console.log(this.data2);
        //      })
        }
    
    
        ExportToExcel() {
            {
                if(!this.BCNo){
                    console.log(this.BCNo)
                    alert("No Dokumen harus Diisi");
                }else{
                var args = {
                   bcno:  this.BCNo ? this.BCNo : ""
                   }
                
                this.service.generateExcel(args)
                
                // .catch(e => {
                //     alert(e.replace(e, "Error:",""));
                // });
                .catch((result) => {
                    alert("Data Tidak Ditemukan.");
                } )
            }
            }
        }

    

    reset() {
        this.BCNo = null;
        this.rojob = null;
        this.itemcode = null;
        this.comodity = null;
    }
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }

    get bcnoLoader(){
        return bcnoLoader;
    }
}



