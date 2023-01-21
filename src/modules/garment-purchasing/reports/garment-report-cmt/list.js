import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require('moment');
var unitLoader = require('../../../../loader/unit-local-loader');
@inject(Router, Service)
export class List {
    info = { page: 1,size:75};
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
    bind(context) {
        console.log(context);
        this.context = context;

    }

    search(){
            this.searching();        
    }
    activate() {
       
    }
    tableData = []
    searching() {
        var args = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unitcode : this.unitcode ? this.unitcode.Code : "",
            page: this.info.page,
            size: this.info.size,
            
           
        };
        
        this.service.search(args)
            .then(result=>{
                // var datas=[];
                // console.log(result)
                // for(var _data of result.data){
                //     //console.log(_data)

                  
                //     datas.push(_data);

                //  }
                //  this.info.total= result.info.total;
                //  this.data = result.data;
                // //console.log(this.data)
                // console.log(result.info.total)
                // console.log(this.info)
               
                this.rowCount=[];
                var rowDoc=[];
                this.info.total=result.info.total;    
                var index=0;    
                for(var a of result.data){
                    //var bc=a.Invoice.toString();
                    //var doc=a.ExpanditurGoodId;
                    var inv=a.Invoice.toString();
                    var bon=a.ExpenditureGoodId;
                    if(!this.rowCount[inv]){
                        this.rowCount[inv]=1;
                    }
                    else{
                        this.rowCount[inv]++;
                    }
 
                    if(!rowDoc[bon+inv]){
                        index++;
                        //a.count=index;
                        rowDoc[bon+inv]=1;
                    }
                    else{
                        rowDoc[bon+inv]++;
                    }
                }
                for(var b of result.data){
                    let bcno=result.data.find(o=> o.Invoice + o.ExpenditureGoodId==b.Invoice + b.ExpenditureGoodId);
                    if(bcno){
                        bcno.docspan=rowDoc[b.ExpenditureGoodId+b.Invoice];
                    }
                    let invc=result.data.find(o=> o.Invoice ==b.Invoice);
                    if(invc){
                        invc.rowspan=this.rowCount[b.Invoice];
                    }
                }
                this.data=result.data;
            
            });
            
    }

    reset() {
        this.dateFrom= "",
        this.dateTo="",
        this.KtgrItem="",
        this.unitcode=""
        
    }

    ExportToExcel() {
        let args = {            
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            unitcode : this.unitcode ? this.unitcode.Code : "",
            unitname: this.unitcode ? this.unitcode.UnitName : "",
       
        };
        
        this.service.generateExcel(args);
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);
        this.dateMin = moment(_startDate).format("YYYY-MM-DD");

        if (_startDate > _endDate || !this.dateTo) {
            this.dateTo = e.srcElement.value;
        }
    }


    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
    
    get unitLoader() {
        return unitLoader;
    }

    unitView = (unit) => {
        return `${unit.Code}- ${unit.UnitName}`;
    }
}
