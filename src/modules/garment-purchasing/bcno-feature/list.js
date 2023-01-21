import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');

@inject(Router, Service)
export class List {

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

    @bindable SearchItem;

    SearchItems= ['No RO', 'No BC', 'No PO']
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
            // dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            // dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            filter : this.filter ? this.filter : "",
            keyword : this.BCNo ? this.BCNo : this.pono ? this.pono : this.rono ? this.rono : "",
            //suppliertype : this.Tipe
        };
        this.service.search(args)
            .then(result =>{
                this.data=[]
                for(var _data of result){
                    this.data.push(_data);

                }
                // this.info.total=result.info.total
            })
    }

    reset() {
        this.dateFrom= "",
        this.dateTo="",
        this.KtgrItem="",
        this.UnitItem=""

    }

    ExportToExcel() {
        let args = {            
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unitcode : this.unit ? this.unit : "",
            unitname : this.unitname ? this.unitname : "",
            category : this.category ? this.category : "",
            categoryname : this.categoryname ? this.categoryname : ""
        };

        this.service.generateExcel(args);
    }




    SearchItemChanged(newvalue){
        if (newvalue) {
            if (newvalue === "No BC") {
                this.filter = "BCNo";
                this.pono = "";
                this.rono = "";
                this.data=[];
            }
            else if (newvalue === "No PO") { 
                this.filter = "PONo";
                this.BCNo = "";
                this.rono = "";
                this.data=[];
            }
            else if (newvalue === "No RO") {
                this.filter = "RONo";
                this.BCNo = "";
                this.pono = "";
                this.data=[];
        }else{
            this.unit = "";
            this.unitname = "";
        }
        }
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }

}