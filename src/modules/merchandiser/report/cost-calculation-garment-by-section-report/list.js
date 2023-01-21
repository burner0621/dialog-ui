import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var SectionLoader = require('../../../../loader/garment-sections-loader');

@inject(Router, Service)
export class List {
    
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.today = new Date();
    }
   
    section=null;    
    dateFrom = null;
    dateTo = null;
      
    get sectionLoader() {
        return SectionLoader;
    }

    sectionView = (section) => { 
        return `${section.Code}`
    }

    sectionChanged(newValue){
        var selectedSection = newValue;
        if(selectedSection){
            this.data.SectionCode = selectedSection.Code;
        }
    }

    activate() {
       
    }

    searching() {
        var info = {
            dateFrom : this.dateFrom,
            dateTo : this.dateTo,
        }
        if (this.section) {
           info.section = this.section.Code
        }
        this.service.search(JSON.stringify(info))
            .then(result => {
                  this.data = result;
                  console.log(result);
                  var dataByBrand = {};
                  var subTotalBrand = {};
                  var subTotalBrand1 = {};                 
    
                  for (var data of result) {
                       var Brand = data.BrandName;
                        if (!dataByBrand[Brand]) dataByBrand[Brand] = [];                 
                            dataByBrand[Brand].push({                                                        
                            RO_Number : data.RO_Number,
                            ConfirmDate : moment(data.ConfirmDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.ConfirmDate).format("DD MMM YYYY"),
                            DeliveryDate : moment(data.DeliveryDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.DeliveryDate).format("DD MMM YYYY"),                          
                            UnitName : data.UnitName,
                            Description : data.Description,
                            Section : data.Section,
                            SectionName : data.SectionName,                            
                            Article : data.Article,
                            BuyerCode : data.BuyerCode,
                            BuyerName : data.BuyerName,
                            BrandCode : data.BrandCode,
                            BrandName : data.BrandName,
                            Comodity : data.Comodity,
                            Quantity : data.Quantity.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                            ConfirmPrice : data.ConfirmPrice.toLocaleString('en-EN', { minimumFractionDigits: 4, maximumFractionDigits: 4 }),
                            UOMUnit : data.UOMUnit,
                            Amount : data.Amount.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                        });
                    
                        if (!subTotalBrand[Brand]) {
                           subTotalBrand[Brand] = 0;
                          } 
                            subTotalBrand[Brand] += data.Amount;
                            
                         if (!subTotalBrand1[Brand]) {
                           subTotalBrand1[Brand] = 0;
                          } 
                            subTotalBrand1[Brand] += data.Quantity;
                          }
     
               var brands = [];
               this.AmountTotal = 0;
               this.QtyTotal = 0;               
                   
               for (var data in dataByBrand) {
                   brands.push({
                   data: dataByBrand[data],
                   brand: dataByBrand[data][0].BrandName,
                   subTotal: (subTotalBrand[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                   subTotal1: (subTotalBrand1[data]).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),                   
              });
                   this.AmountTotal += subTotalBrand[data];   
                   this.QtyTotal += subTotalBrand1[data];   
                                   
               }
               this.AmountTotal = this.AmountTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.QtyTotal = this.QtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.brands = brands;
             });        
    }

    ExportToExcel() {
        var info = {
            dateFrom : this.dateFrom,
            dateTo : this.dateTo,
        }
        if (this.section) {
           info.section = this.section.Code
        }
        this.service.generateExcel(JSON.stringify(info));
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.section = null;
        this.brands = [];
        this.QtyTotal = null;            
        this.AmountTotal = null;    
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}