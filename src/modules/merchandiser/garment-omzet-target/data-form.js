import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from './service';

import SectionLoader from "../../../loader/garment-sections-loader";

@containerless()
@inject(BindingEngine, Service, Element)
export class DataForm {
    @bindable isCreate = false;
    @bindable isView = false;
    @bindable readOnly = false;
    @bindable data = {};
    @bindable error = {};
    @bindable options = {};
    @bindable hasItems=false;
    @bindable filterSection;
    @bindable filterMonth;
    @bindable filterYear;
        
    quatercode = null;
    sectionname = null;

    constructor(bindingEngine, service, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.service = service;

    }

    filterMonthChanged(newValue) {   
       var selectedMonth = newValue;
        if (selectedMonth) {
            this.data.MonthOfPeriod = selectedMonth;
            let quatercode="";
                switch (this.filterMonth) {
                    case 'Januari' :
                         quatercode = "Q1";
                         break;
                    case 'Februari' :
                         quatercode = "Q1";
                         break;
                    case 'Maret' :
                         quatercode = "Q1";
                         break;     
                    case 'April' :
                         quatercode = "Q2";
                         break;
                    case 'Mei' :
                         quatercode = "Q2";
                         break;
                    case 'Juni' :
                         quatercode = "Q2";
                         break;
                    case 'Juli' :
                         quatercode = "Q3";
                         break;
                    case 'Agustus' :
                         quatercode = "Q3";
                         break;
                    case 'September' :
                         quatercode = "Q3";
                         break;    
                    case 'Oktober' :
                         quatercode = "Q4";
                         break;
                    case 'November' :
                         quatercode = "Q4";
                         break;                                                                                                                                                                           
                    default:
                        quatercode = "Q4";
                        break;     
                }
                this.data.QuaterCode = quatercode;
        }
    }

    filterSectionChanged(newValue){
        var selectedSection = newValue;
        console.log(selectedSection)
        if(selectedSection){
            this.data.SectionId = selectedSection.Id;
            this.data.SectionCode = selectedSection.Code;
            this.data.SectionName = selectedSection.Name;               
        }
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;


        const moment = require('moment');
        moment.locale('id');

        this.monthList = moment.months();
        let currentMonth = moment().month();

        this.data.YearOfPeriod = moment().year();      
        this.filterMonth = this.monthList[currentMonth];

        this.yearOptions = {
            min: this.data.YearOfPeriod - 20,
            max: this.data.YearOfPeriod + 20
        }

        if(this.data.Id){
           this.filterSection = {};
           this.filterSection.Id = this.data.SectionId;
           this.filterSection.Code = this.data.SectionCode;
           this.filterSection.Name = this.data.SectionName;  
           this.filterMonth = this.data.MonthOfPeriod;          
           this.options.isCreate = this.context.isCreate;
        }
    }

    sectionView = (section) => { 
        return `${section.Code}`
    }
   
    get sectionLoader() {
        return SectionLoader;
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