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
        console.log(selectedSection)
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
       
                var datas = [];
                for (var item of this.data){
                    item.ConfirmDate=moment(item.ConfirmDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.ConfirmDate).format("DD MMM YYYY");
                    item.DeliveryDate=moment(item.DeliveryDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.DeliveryDate).format("DD MMM YYYY");                    
                    item.ValidatedDate=moment(item.ValidatedDate).format("DD MMM YYYY")=="01 Jan 0001" ? "-" : moment(item.ValidatedDate).format("DD MMM YYYY");                    
            
                    item.Quantity=item.Quantity.toLocaleString('en-EN',{minimumFractionDigits: 2, maximumFractionDigits: 2});
                    
                    datas.push(item);
                }
                this.data = datas;

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
        this.sectioncode = null;
        this.section = null;
        this.sectionname = null;
        this.data = [];
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}