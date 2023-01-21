import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");

@inject(Router, Service)
export class List {

    constructor(router, service) {
        this.service = service;
        this.router = router;

    }

   /* unit=null;
    duration='';
    dateFrom = null;
    dateTo = null; */

    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false
    }

    //statusOptions = ["", "IN", "OUT", "ADJ"];
    Grade = ["", "A", "B", "C"];
    columns = [
       
            { field: "index", title: "No", sortable: false},
            { field: "Construction", title: "Konstruksi", sortable: false},
            { field: "Grade", title: "Grade", sortable: false},
            { field: "QtyPiece", title: "Jml. Piece", sortable: false},
            { field: "Qty", title: "Jml. Meter", sortable: false},
            { field: "", title: "Keterangan", sortable: false}
    ];

    bind()
    {

    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);
    
    
        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;
    } 

    search() {
        this.error = {};
    
       
        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.Table.refresh();
        }
        
    }

    reset() {
     //   this.statusOptions = undefined;
        this.Grade = undefined;
       // this.dateFrom = undefined;
        this.dateTo = undefined; 

        this.flag = true;
       // this.filter = [];
        this.data = [];
        
    }


    loader = (info) => {
        var order = {};
    
        if (info.sort)
            order[info.sort] = info.order;
        
    
        let args = {
            page: parseInt(info.offset / info.limit, 10) + 1,
            size: info.limit,
            keyword: info.search,
            order: order,
        //    statusOptions: this.statusOpt,
           Grade: this.grade,
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            //dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):"", 
            
        };

        console.log(this.grade);
        console.log(args);
        return this.flag ?
            (
                this.service.search(args)
                    .then(result => {
                        var index=0;
                        for(var data of result.Data){
                            index++;
                            data.index=index;
                           
                        }
                        return {
                            total: result.TotalData,
                            data: result.Data
                        };
                    })
            ) : { total: 0, data: [] };
        } 
   
        ExportToExcel() {
            this.error = {};
        if (Object.getOwnPropertyNames(this.error).length === 0) {
            let args = {
           // ProductionOrderId: this.productionOrder? this.productionOrder.Id : "",
            grade: this.grade,
            dateTo: this.dateTo? moment(this.dateTo).format("MM/DD/YYYY"):"",
            //dateFrom: this.dateFrom? moment(this.dateFrom).format("MM/DD/YYYY"):""
        };

            this.service.generateExcel(args)
                .catch(e => {
                    alert(e.replace(e, "Error: ", ""));
                });
        }
    }
}