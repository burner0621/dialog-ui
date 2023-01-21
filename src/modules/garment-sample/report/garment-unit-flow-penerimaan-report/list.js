import { inject, bindable } from 'aurelia-framework';
import moment from 'moment';
import { Service,CoreService } from './service';
import { Router } from 'aurelia-router';
const UnitLoader = require('../../../../loader/garment-units-loader');
 

@inject(Router, Service,CoreService)
export class List {
    @bindable KtgrItem;
    // @bindable categoryselect
    @bindable selectedUnit;
    KategoriItem = ['','BAHAN BAKU','BAHAN PENDUKUNG', 'BAHAN EMBALACE'];
    
    KtgrItemChanged(newvalue){
        if (newvalue) {
            if (newvalue === "BAHAN BAKU") {
                this.category = "BB";
                this.categoryname = "BAHAN BAKU";
                this.productcode = "";
            }
            else if (newvalue === "BAHAN PENDUKUNG") { 
                this.category = "BP";
                this.categoryname = "BAHAN PENDUKUNG";
                this.productcode = "";
            }
            else if (newvalue === "BAHAN EMBALACE") {
                this.category = "BE"; 
                this.categoryname = "BAHAN EMBALACE";
                this.productcode = "";
            }
          
        }
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

    constructor(router, service,coreService) {
        this.service = service;
        this.router = router;
        this.coreService = coreService;
    }
 
    
    search() {
        //this.flag = true;
        let args = {
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : null,
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            category : this.category ? this.category : "",
            unit : this.unit ? this.unit.Code : "",
          }
          this.service.search(args)
          .then(result => {
              console.log(result)
              this.AmountTotal1 = 0;
              //this.AmountTotal2 = 0;
              this.data=[];
              //var datatemp = [];
              for (var i of result) {
                  this.AmountTotal1 += i.jumlahterima;
                  this.data.push(i);
              }
              this.AmountTotal1 = this.AmountTotal1.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
             
          })
    }

    reset() {
        this.flag = false;
        this.category = undefined;
        this.KtgrItem ="";
        this.dateFrom = undefined;
        this.dateTo = undefined;
        
        // this.tableList.refresh();
    }

    xls() {
        let filter = {};
        if (this.category) {
            filter.category = this.category;
            filter.categoryname = this.categoryname;
        }
        if (this.unit){
          filter.unit = this.unit.Code;
          filter.unitname = this.unit.Name;
        }

        if (this.dateFrom && this.dateFrom != 'Invalid Date') {
            filter.dateFrom = this.dateFrom;
            filter.dateTo = this.dateTo;

            filter.dateFrom = moment(filter.dateFrom).format("MM/DD/YYYY");
            filter.dateTo = moment(filter.dateTo).format("MM/DD/YYYY");
        }
        console.log(filter);
        this.service.xls(filter.unit, filter.category, filter.dateFrom, filter.dateTo, filter.unitname, filter.categoryname);
    }

    unitView = (unit) => {
        return `${unit.Code} - ${unit.Name}`
      
    }

    get unitLoader() {
      return UnitLoader;
    }
    
}
