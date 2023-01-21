import { inject, bindable, containerless, computedFrom, BindingEngine } from 'aurelia-framework'
import { Service } from './service';

import SectionLoader from "../../../loader/garment-sections-loader";
import GarmentBuyerLoader from "../../../loader/garment-buyers-loader";
import GarmentBuyerBrandLoader from "../../../loader/garment-buyer-brands-loader";

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
    @bindable buyerAgent;
    @bindable buyerBrand;
    @bindable section;
    @bindable BuyerId;

    scTypes = ["JOB ORDER", "SAMPLE"];

    filterBuyerBrand = {};

    constructor(bindingEngine, service, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
        this.service = service;
    }

    bind(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.data.SCDate=this.data.SCDate?this.data.SCDate:new Date();
        if(this.data.SCNo){
        
            this.buyerAgent={};
            this.buyerAgent.Id = this.data.BuyerAgentId;
            this.buyerAgent.Code = this.data.BuyerAgentCode;
            this.buyerAgent.Name = this.data.BuyerAgentName;
            this.section = {};
            this.section.Id = this.data.SectionId;
            this.section.Code = this.data.SectionCode;
            this.buyerBrand = {};
            this.buyerBrand.Id = this.data.BuyerBrandId;
            this.buyerBrand.Code = this.data.BuyerBrandCode;
            this.buyerBrand.Name = this.data.BuyerBrandName;

        }
        else {
            this.data.SCNo = null;
        }
        this.options.isCreate = this.context.isCreate;
    }

    sectionChanged(newValue){
        var selectedSection = newValue;
        if(selectedSection){
            this.data.SectionId = selectedSection.Id;
            this.data.SectionCode = selectedSection.Code;
        }
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


    sectionView = (section) => { 
        return `${section.Code}`
    }
    buyerAgentView = (buyerAgent) => {
        return `${buyerAgent.Code} - ${buyerAgent.Name}`
    }
    buyerBrandView = (buyerBrand) => {
        return `${buyerBrand.Code} - ${buyerBrand.Name}`
    }

    get sectionLoader() {
        return SectionLoader;
    }
    get garmentBuyerLoader() { 
        return GarmentBuyerLoader;
    }
    get garmentBuyerBrandLoader() { 
        return GarmentBuyerBrandLoader;
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