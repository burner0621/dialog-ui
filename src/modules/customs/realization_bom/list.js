import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');

@inject(Router, Service)
export class List{

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }

    info = { page: 1,size:50};

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

    @bindable UnitItem;
    UnitItems = ['','KONFEKSI 2A','KONFEKSI 2B','KONFEKSI 2C','KONFEKSI 1A','KONFEKSI 1B']

    search(){
            this.info.page = 1;
            this.info.total=0;
            this.searching();        
    }
    activate() {
       
    }

    tableData = []
    searching() {
        var args = {
            // page: this.info.page,
            // size: this.info.size,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unitcode : this.unit ? this.unit : "",
        };
        this.service.search(args)
            .then(result=>{
                var datas=[];
                var datadetail=[];
                var index=0;

                for(var _data of result.data){
                    
                    var ro =_data.RO;

                    for(var _data1 of _data.rincian){
                        datadetail.push(_data1);
                    }

                    datas.push(_data);

                }
                this.data=datas;
            
                this.data2=datadetail
                console.log("data1",this.data);
                console.log("data2",this.data2);


            })


    }

    UnitItemChanged(newvalue){
        
        if (newvalue) {
            if (newvalue === "KONFEKSI 2A") {
                this.unit = "C2A";
                this.unitname = "KONFEKSI 2A";
            }
            else if (newvalue === "KONFEKSI 2B") { 
                this.unit = "C2B";
                this.unitname = "KONFEKSI 2B";
            }
            else if (newvalue === "KONFEKSI 2C") {
                this.unit = "C2C"; 
                this.unitname = "KONFEKSI 2C";
            }else if(newvalue === "KONFEKSI 1A"){
                this.unit = "C1A";
                this.unitname = "KONFEKSI 1A";
            }else if(newvalue === "KONFEKSI 1B"){
                this.unit = "C1B";
                this.unitname = "KONFEKSI 1B";
            }else{
                this.unit = "";
                this.unitname = "";
            }
        }else{
            this.unit = "";
            this.unitname = "";
        }
    }

    ExportToExcel() {
        let args = {            
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unitcode : this.unit ? this.unit : "",
            unitname : this.unitname ? this.unitname : "",
        };
        
        this.service.generateExcel(args);
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }

}