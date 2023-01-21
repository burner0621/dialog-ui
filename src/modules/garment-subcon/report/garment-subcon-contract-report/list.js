import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');
const SupplierLoader = require('../../../../loader/garment-supplier-loader');
const SubconContractLoader = require("../../../../loader/garment-subcon-contract-loader");

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }

    info = { page: 1,size:25};

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };

   
    @bindable ContractTypes;
    @bindable ContractTypeItem;
    // @bindable KtgrItem;
    
    ContractTypeItems= ['','SUBCON BAHAN BAKU','SUBCON CUTTING','SUBCON GARMENT','SUBCON JASA']
    //UnitItems = ['','KONFEKSI 2A','KONFEKSI 2B','KONFEKSI 2C','KONFEKSI 1A','KONFEKSI 1B']

    supplierView = (supplier) => {
        var code= supplier.code || supplier.Code;
        var name=supplier.name || supplier.Name;
        return `${code} - ${name}`;
    }

    get subconContractLoader() {
        return SubconContractLoader;
    }

    get supplierLoader() {
        return SupplierLoader;
    }

    search(){
            this.info.page = 1;
            this.info.total=0;
            this.searching();        
    }
    activate() {
       
    }

    tableData = []
    searching() {
        {
            var info = {
                page: this.info.page,
                size: this.info.size,
                supplierNo : this.SupplierCode ? this.SupplierCode.Id : 0,
                contractType : this.tipe ? this.tipe : "",
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            }
            this.service.search(info)
                .then(result => {
                    this.data = result;
                    console.log(result);
                    var dataReport = [];

                    for(var _data of this.data.garmentSubconContactReportDto){

                        dataReport.push(_data)
                    }
                    
                    this.data = dataReport;
                    // console.log(this.data)
                });
            }
            
        }
    
                
            // this.info.total=result.info.total
        
    

    reset() {
        this.dateFrom= "",
        this.dateTo="",
        this.SupplierCode="",
        this.ContractTypeItem=""
        
    }

    ExportToExcel() {
        {
        var info = {            
            supplierNo : this.SupplierCode ? this.SupplierCode.Id : 0,
            contractType : this.tipe ? this.tipe : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
            };
        
        this.service.generateExcel(info)
        .catch(e => {
            alert(e.replace(e, "Error: ",""))
        });
    }
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);
        this.dateMin = moment(_startDate).format("YYYY-MM-DD");

        if (_startDate > _endDate || !this.dateTo) {
            this.dateTo = e.srcElement.value;
        }
    }

    ContractTypeItemChanged(newvalue){
        //console.log(newvalue)
        if (newvalue) {
            if (newvalue === "SUBCON BAHAN BAKU") {
                this.tipe = "SUBCON BAHAN BAKU";
                //this.Contractname = "SUBCON BAHAN BAKU";
            }
            else if (newvalue === "SUBCON CUTTING") { 
                this.tipe = "SUBCON CUTTING"; 
                //this.Contractname = "SUBCON CUTTING";
            }
            else if (newvalue === "SUBCON GARMENT") {
                this.tipe = "SUBCON GARMENT"; 
                //this.Contractname = "SUBCON GARMENT";
            }
            else if(newvalue === "SUBCON JASA") {
                this.tipe = "SUBCON JASA";
                //this.Contractname = "SUBCON JASA";
            }
        }else{
            this.unit = "";
            //this.unitname = "";
        }
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
}
    

