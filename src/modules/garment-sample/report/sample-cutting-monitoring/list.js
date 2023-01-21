import {inject} from 'aurelia-framework';
import {Service,CoreService} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';
const UnitLoader = require('../../../../loader/garment-sample-unit-loader');

@inject(Router, Service,CoreService)
export class List {
    constructor(router, service,coreService) {
        this.service = service;
        this.router = router;
        this.coreService=coreService;
    }
    async bind(context) {
        this.context = context;
        if (!this.unit) {
            var units = await this.coreService.getSampleUnit({ size: 1, keyword: 'SMP1', filter: JSON.stringify({ Code: 'SMP1' }) });
            this.unit = units.data[0];

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
                    _data.price=_data.price.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.qtyOrder=_data.qtyOrder.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.cuttingQtyMeter=_data.cuttingQtyMeter.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.stocks=_data.stock.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.cuttingsQtyPcs=_data.cuttingQtyPcs.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.expenditures=_data.expenditure.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.remainQtys=_data.remainQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    this.data.push(_data);

                 }
            });
    }
    
    ExportToExcel() {
        var info = {
            unit : this.unit ? this.unit.Id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
      
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
    get sumCuttingQtyPcs()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.cuttingQtyPcs;
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
                sum += item.expenditure;
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
}