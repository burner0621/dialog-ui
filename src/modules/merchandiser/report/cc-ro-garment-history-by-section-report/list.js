import { inject, bindable } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

var SectionLoader = require('../../../../loader/garment-sections-loader');
var CostCalculationGarmentLoader = require('../../../../loader/cost-calculation-garment-loader');

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

    costCalculationFilter = {}

    get costCalculationGarmentLoader() {
        return CostCalculationGarmentLoader;
    }
      
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

        if (this.selectedROGarment) {
           info.roNo = this.selectedROGarment.RO_Number
        }
        
        this.service.search(JSON.stringify(info))
            .then(result => {
                this.data = result;
                console.log(result);
                  
                var datas = [];
                for (var item of this.data){
                    item.DeliveryDate=moment(item.DeliveryDate).format("DD MMM YYYY")=="01 Jan 0001" ? "-" : moment(item.DeliveryDate).format("DD MMM YYYY");                    
                    item.ApprovalMDDate=moment(item.ApprovalMDDate).format("DD MMM YYYY")=="01 Jan 0001" ? "-" : moment(item.ApprovalMDDate).format("DD MMM YYYY");                    
                    item.ApprovalIEDate=moment(item.ApprovalIEDate).format("DD MMM YYYY")=="01 Jan 0001" ? "-" : moment(item.ApprovalIEDate).format("DD MMM YYYY");                    
                    item.ApprovalPurchDate=moment(item.ApprovalPurchDate).format("DD MMM YYYY")=="01 Jan 0001" ? "-" : moment(item.ApprovalPurchDate).format("DD MMM YYYY");                    
                    item.ApprovalKadivMDDate=moment(item.ApprovalKadivMDDate).format("DD MMM YYYY")=="01 Jan 0001" ? "-" : moment(item.ApprovalKadivMDDate).format("DD MMM YYYY");                    
                    item.ValidatedMDDate=moment(item.ValidatedMDDate).format("DD MMM YYYY")=="01 Jan 0001" ? "-" : moment(item.ValidatedMDDate).format("DD MMM YYYY");                    
                    item.ValidatedSampleDate=moment(item.ValidatedSampleDate).format("DD MMM YYYY")=="01 Jan 0001" ? "-" : moment(item.ValidatedSampleDate).format("DD MMM YYYY");                    
                    
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
        if (this.section) {
           info.section = this.section.Code
        }
        if (this.selectedROGarment) {
           info.roNo = this.selectedROGarment.RO_Number
        }
        this.service.generateExcel(JSON.stringify(info));
    }

    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.section = null;
        this.data = [];
        this.selectedROGarment = null;            
    }

    dateFromChanged(e) {
        var _startDate = new Date(e.srcElement.value);
        var _endDate = new Date(this.dateTo);

        if (_startDate > _endDate)
            this.dateTo = e.srcElement.value;
    } 
}