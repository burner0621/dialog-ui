import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
var moment = require("moment");
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
   
    unit=null;
    sectionName = null;    
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
            this.SectionName = selectedSection.Name;

        }
    }

    searching() {
        {
            var info = {
            unit : this.unit ? this.unit.Id : "",
            sectionName : this.SectionName ? this.SectionName : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
    
        this.service.search(info)
            .then(result => {
                  console.log(result);
                  this.data = result;
                  var datas = [];   

                  for (var item of this.data){
                       item.PRDate=moment(item.PRDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.ConfirmDate).format("DD MMM YYYY");
                       item.DeliveryDate=moment(item.DeliveryDate).format("DD MMM YYYY")=="01 Jan 1970" ? "-" : moment(item.DeliveryDate).format("DD MMM YYYY");                    
                       item.ValidatedDate=moment(item.ValidatedDate).format("DD MMM YYYY")=="01 Jan 0001" ? "-" : moment(item.ValidatedDate).format("DD MMM YYYY");                    
          
                      datas.push(item);
                  }
                  this.data = datas;
                });
        }
    }

    ExportToExcel() {
         {
            var filter = {
            unit : this.unit ? this.unit.Id : "",
            sectionName : this.SectionName ? this.SectionName : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
           }

        this.service.generateExcel(filter)
            .catch(e => {
                alert(e.replace(e, "Error: ",""))
            });
        }
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.unit = null;
        this.sectionName = null;
        this.data = [];
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;

    } 
}