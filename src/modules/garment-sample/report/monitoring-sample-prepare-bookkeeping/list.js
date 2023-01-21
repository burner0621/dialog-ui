import { inject, bindable } from 'aurelia-framework';
import {Service,CoreService} from "./service";
import moment from 'moment';
const UnitLoader = require('../../../../loader/garment-units-loader');

@inject(Service, CoreService)
export class List {
    @bindable selectedUnit;

    constructor(service,coreService) {
        this.service = service;
        this.coreService = coreService;
    }

   async bind(context) {
        this.context = context;
        if (!this.unit) {
            var units = await this.coreService.getSampleUnit({ size: 1, keyword: 'SMP1', filter: JSON.stringify({ Code: 'SMP1' }) });
            this.selectedUnit = units.data[0];

        }
    }
    selectedUnitChanged(newValue) {
        if (newValue) {
            this.unit = newValue;
        } else {
            this.unit = null;
        }
    }
    searching() {
        var info = {
            unit : this.unit ? this.unit.Id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info)
            .then(result => {
                this.data=[];
                console.log(result);
                for(var _data of result){
                    _data.prices=_data.price.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.stocks=_data.stock.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.receipts=_data.receipt.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.mainFabricExpenditures=_data.mainFabricExpenditure.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.nonMainFabricExpenditures=_data.nonMainFabricExpenditure.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.expenditures=_data.deliveryReturn.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data.avals=_data.aval.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
                    _data.remainQtys=_data.remainQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
                    _data.remainNominals=(_data.remainQty * _data.price).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });  
                    this.data.push(_data);

                 }
            });
    }
    
    ExportToExcel() {
        var info = {
            unit : this.unit ? this.unit.Id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            type :"bookkeeping"
      
        }
        this.service.generateExcel(info);
    }

    get unitLoader(){
        return UnitLoader;
    }
    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`;
    
    }

    
    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.unit = null;
    }
    get sumStock()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.stock;
            }
        }
        
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    get sumReceipt()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.receipt;
            }
        }
        
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    
    get sumMainFabricExpenditure()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.mainFabricExpenditure;
            }
        }
       
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }

    get sumNonMainFabricExpenditure()
    {
        var sum=0;
        if(this.data)
        { for(var item of this.data)
            {
                sum += item.nonMainFabricExpenditure;
            }
        }
       
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }

    get sumExpenditure()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.deliveryReturn;
            }
        }
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    
    get sumAval()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.aval;
            } 
        }
        
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    get sumRemainQty()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.remainQty;
            }
        }
        
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    get sumNominal()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.remainQty * item.price;
            } 
        }
        
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    
}