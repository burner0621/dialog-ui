import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

import GarmentBuyerLoader from "../../../../loader/garment-buyers-loader";
import GarmentBuyerBrandLoader from "../../../../loader/garment-buyer-brands-loader";
@containerless()

@inject(BindingEngine, Service, Element)
export class List {
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable options = {};
    @bindable buyerAgent;
    @bindable buyerBrand;
    @bindable BuyerId;

   filterBuyerBrand = {};

    constructor(bindingEngine, service, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.service = service;

        const moment = require('moment');
        moment.locale('id');
        this.currentYear = moment().year();
        this.filterYear = this.currentYear;

        this.yearOptions = {
            min: this.currentYear - 50,
            max: this.currentYear + 50
        }
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
    }

    buyerAgentChanged(newValue) {
        var selectedBuyerAgent = newValue;
        if(selectedBuyerAgent){
            this.data.BuyerAgentId = selectedBuyerAgent.Id;
            this.data.BuyerAgentCode = selectedBuyerAgent.Code;
            this.data.BuyerAgentName = selectedBuyerAgent.Name;
            this.filterBuyerBrand = {"BuyerName":this.data.BuyerAgentName};
            if(newValue.Type){
                this.buyerBrand = null;
                this.data.BuyerBrandId = null;
                this.data.BuyerBrandCode = null;
                this.data.BuyerBrandName = null;
            }
        }
    }

    buyerBrandChanged(newValue) { 
        var selectedBuyerBrand = newValue;
        if(selectedBuyerBrand){
            this.data.BuyerBrandId = selectedBuyerBrand.Id;
            this.data.BuyerBrandCode = selectedBuyerBrand.Code;
            this.data.BuyerBrandName = selectedBuyerBrand.Name;
        }
    }


    buyerAgentView = (buyerAgent) => {
        return `${buyerAgent.Code} - ${buyerAgent.Name}`
    }
    buyerBrandView = (buyerBrand) => {
        return `${buyerBrand.Code} - ${buyerBrand.Name}`
    }

    get garmentBuyerLoader() { 
        return GarmentBuyerLoader;
    }
    get garmentBuyerBrandLoader() { 
        return GarmentBuyerBrandLoader;
    }

    searching() {
        var info = {
            year : this.filterYear
        }
        if (this.buyerAgent) {
           info.buyerAgent = this.buyerAgent.Code
        }

        if (this.buyerBrand) {
           info.buyerBrand = this.buyerBrand.Code
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
                            DeliveryDate : moment(data.DeliveryDate).format("DD MMM YYYY")=="01 Jan 1970"? "-" : moment(data.DeliveryDate).format("DD MMM YYYY"),                          
                            Description : data.Description,
                            Article : data.Article,
                            BuyerCode : data.BuyerCode,
                            BuyerName : data.BuyerName,
                            BrandCode : data.BrandCode,
                            BrandName : data.BrandName,
                            Commission : data.Commission.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),              
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
            year : this.filterYear,
        }
        if (this.buyerAgent) {
           info.buyerAgent = this.buyerAgent.Code
        }

        if (this.buyerBrand) {
           info.buyerBrand = this.buyerBrand.Code
        }
        this.service.generateExcel(JSON.stringify(info));
    }

    reset() {
        this.filterYear = this.currentYear;
        this.buyerAgent = null;
        this.buyerBrand = null;
        this.brands = [];
        this.QtyTotal = null;            
        this.AmountTotal = null;    
    }

  controlOptions = {
    label: {
      length: 3
    },
    control: {
      length: 3,
    }
  }

}