import {inject, bindable} from 'aurelia-framework';
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

    @bindable UnitItem;

    UnitItems = ['','KONFEKSI 2A','KONFEKSI 2B','KONFEKSI 2C','KONFEKSI 1A','KONFEKSI 1B']

    UnitItemChanged(newvalue){
        // console.log(newvalue);
        this.unit = 0;
        this.unitname = "";
        if (newvalue) {
            if (newvalue === "KONFEKSI 2A") {
                this.unit = 45;
                this.unitname = "KONFEKSI 2A";
            }
            else if (newvalue === "KONFEKSI 2B") { 
                this.unit = 46;
                this.unitname = "KONFEKSI 2B";
            }
            else if (newvalue === "KONFEKSI 2C") {
                this.unit = 47; 
                this.unitname = "KONFEKSI 2C";
            }else if(newvalue === "KONFEKSI 1A"){
                this.unit = 51;
                this.unitname = "KONFEKSI 1A";
            }else if(newvalue === "KONFEKSI 1B"){
                this.unit = 52;
                this.unitname = "KONFEKSI 1B";
            }else if(newvalue === ""){
                this.unit = 0;
                this.unitname = "";
            }
        }

        // console.log(this.unit);
    }
    
    searching() {
        var info = {
            unit : this.unit ? this.unit : 0,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(info)
            .then(result => {
                this.data=[];
                console.log(result);
                for(var _data of result){
                      
                    _data.expenditureDate= moment(_data.expenditureDate).format("YYYY-MM-DD");
                    _data.pebDate=  moment(_data.pebDate).format("DD MMM YYYY") == "01 Jan 1970" || moment(_data.pebDate).format("DD MMM YYYY") == "01 Jan 1900" ? "-" : moment(_data.pebDate).format("YYYY-MM-DD");
                    _data.prices=_data.price.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.qtys=_data.qty.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    _data.nominals=(_data.qty * _data.price).toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                    this.data.push(_data);

                 }
            });
    }
    
    ExportToExcel() {
        var info = {
            unit : this.unit ? this.unit : 0,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
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
    get sumQty()
    {
        var sum=0;
        if(this.data)
        {
            for(var item of this.data)
            {
                sum += item.qty;
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
                sum += item.qty * item.price;
            }
        }
        
        return sum.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); 
    }
}