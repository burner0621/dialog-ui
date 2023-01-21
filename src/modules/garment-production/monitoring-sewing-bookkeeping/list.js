import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';
const UnitLoader = require('../../../loader/garment-units-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    bind(context) {
        this.context = context;
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
                    _data.qtyOrder=_data.qtyOrder.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._beginingBalanceSewingQty=_data.beginingBalanceSewingQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._qtySewingIn=_data.qtySewingIn.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._qtySewingInTransfer=_data.qtySewingInTransfer.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._qtySewingOut=_data.qtySewingOut.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._wipSewingOut=_data.wipSewingOut.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._wipFinishingOut=_data.wipFinishingOut.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._qtySewingRetur=_data.qtySewingRetur.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._qtySewingAdj=_data.qtySewingAdj.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._endBalanceSewingQty=_data.endBalanceSewingQty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                    _data._endBalanceSewingPrice=_data.endBalanceSewingPrice.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
                  
                    this.data.push(_data);

                 }
            });
    }
    
    ExportToExcel() {
        var info = {
            unit : this.unit ? this.unit.Id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo: this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            type:"bookkeeping"
      
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
              get sumBeginingBalanceSewingQty()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.beginingBalanceSewingQty;
            }
        }
        
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    get sumSewingIn()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.qtySewingIn;
            }
        }
        
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    
    get sumSewingOut()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.qtySewingOut;
            }
        }
       
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    get sumSewingInTransfer()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.qtySewingInTransfer;
            }
        }
       
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    get sumWIPSewingOut()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.wipSewingOut;
            }
        }
       
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
}
    
get sumWIPFinishingOut()
{
    var sum=0;
    if(this.data)
    {
        for(var item of this.data)
        {
            sum += item.wipFinishingOut;
        }
    }
   
    return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    
get sumSewingRetur()
{
    var sum=0;
    if(this.data)
    {
        for(var item of this.data)
        {
            sum += item.qtySewingRetur;
        }
    }
   
    return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    get sumSewingAdj()
{
    var sum=0;
    if(this.data)
    {
        for(var item of this.data)
        {
            sum += item.qtySewingAdj;
        }
    }
   
    return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
    get sumEndBalanceSewingQty() {
        var sum = 0;
        if (this.data) {
            for (var item of this.data) {
                sum += item.endBalanceSewingQty;
            }
        }
       
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    get sumEndBalanceSewingPrice()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.endBalanceSewingPrice;
            }
        }
       
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
        }
     
}