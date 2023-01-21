import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';
var UnitLoader = require('../../../../loader/unit-loader');
var SectionLoader = require('../../../../loader/garment-sections-loader');

@inject(Router, Service)
export class List {
    @bindable filterSection;

    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
   
    unitName=null;    
    section = null;
    dateFrom = null;
    dateTo = null;
      
    get unitLoader() {
        return UnitLoader;
    }

    get sectionLoader() {
        return SectionLoader;
    }

    sectionView = (section) => {
        return `${section.Code}`
    }

    activate() {
       
    }

    filterSectionChanged(newValue) {
        var selectedSection = newValue;
        if (selectedSection) {
            this.sectioncode = selectedSection.Code;
            this.sectionname = selectedSection.Name;  
        }
    }

    searching() {
        console.log(this.sectioncode)
        var info = {
            dateFrom : this.dateFrom,
            dateTo : this.dateTo,
        }
        if (this.unitName) {
           info.unitName = this.unitName.Name
        }
        if (this.sectioncode) {
           info.section = this.sectioncode
        }
        this.service.search(JSON.stringify(info))
            .then(result => {
                  this.data = result;
                  console.log(result);
 
                  var dataByRO = {};
                  var subTotalRO = {};
    
                  for (var data of result) {
                       var RONO = data.RO_Number;
                        if (!dataByRO[RONO]) dataByRO[RONO] = [];                 
                            dataByRO[RONO].push({            
                            RO_Number : data.RO_Number,
                            UnitName : data.UnitName,
                            Section : data.Section,
                            BuyerCode : data.BuyerCode,
                            BuyerName : data.BuyerName,
                            Article : data.Article,
                            DeliveryDate : moment(data.DeliveryDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.DeliveryDate).format("DD MMM YYYY"),                          
                            PONumber : data.PONumber,
                            CategoryName : data.CategoryName,
                            ProductCode : data.ProductCode,
                            ProductName : data.ProductName,
                            BudgetUOM : data.BudgetUOM,
                            BudgetQuantity : data.BudgetQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),              
                            BudgetPrice : data.BudgetPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            BudgetAmount : data.BudgetAmount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        });
                    
                        if (!subTotalRO[RONO]) {
                           subTotalRO[RONO] = 0;
                           } 
                           subTotalRO[RONO] += data.BudgetAmount;
                        }    

               var RONos = [];
               this.AmountTotal = 0;
                   
               for (var data in dataByRO) {
                   RONos.push({
                   data: dataByRO[data],
                   RONo: dataByRO[data][0].RO_Number,
                   subTotal: (subTotalRO[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                });
                   this.AmountTotal += subTotalRO[data];                                     
               }
               
               this.AmountTotal = this.AmountTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.RONos = RONos;

               });        
    }
          
    ExportToExcel() {
        var info = {
            dateFrom : this.dateFrom,
            dateTo : this.dateTo,
        }
        if (this.unitName) {
           info.unitName = this.unitName.Name
        }
        if (this.sectioncode) {
           info.section = this.sectioncode
        }
        this.service.generateExcel(JSON.stringify(info));
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.unitName = null;
        this.section = null;
        this.sectioncode = null;
        this.sectionname = null;
        this.RONos = [];
        this.AmountTotal = null;    
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;
    } 
}