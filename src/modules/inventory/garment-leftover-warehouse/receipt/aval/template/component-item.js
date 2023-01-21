import { inject, bindable, computedFrom } from 'aurelia-framework'
import { CoreService } from "../service";
var AvalComponentLoader = require('../../../../../../loader/garment-aval-component-loader');
var UomLoader = require('../../../../../../loader/uom-loader');
@inject(CoreService)
export class items {
   
    constructor(coreService) {
        this.coreService = coreService;

    }


    @bindable selectedAvalComponent;
    @bindable selectedUom;

    

    get uomLoader() {
        return UomLoader;
    }
    
    uomView = (uom) => {
         return uom.Unit
    }

    get avalComponentLoader() {
        return AvalComponentLoader;
    }
    
    AvalComponentNoView = (garmentAvalComponent) => {
        return `${garmentAvalComponent.AvalComponentNo}`
    }
    
    @computedFrom("data.UnitFrom")
    get avalLoaderFilter(){
        var filter={
            UnitId: (this.header.UnitFrom || {}).Id || 0,
            "IsReceived==false":true
        }
        for(var item of this.context.context.items){
            filter[`AvalComponentNo == "${item.data.AvalComponentNo}"`]=false;
        }
        return filter;
    }
    
    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.header = context.context.options.header;
        if(!this.data.Uom){
            let result = await this.coreService.getUom({ size: 1, filter: JSON.stringify({ Unit: "PCS" }) });
            this.data.Uom=result.data[0];
        }
        if(this.data){
            this.selectedAvalComponent = this.data.AvalComponentNo;
            this.selectedUom = this.data.Uom;
        }
       // this.selectedUom = this.data.Uom;
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;
        this.isEdit = context.context.options.isEdit;
        this.itemOptions = {
            error: this.error,
            isCreate: this.isCreate,
            readOnly: this.readOnly,
            isEdit:this.isEdit,
        };

        
    }

    
    selectedAvalComponentChanged(newValue){
      
        this.data.AvalComponentId="";
        this.data.Article="";
        this.data.AvalComponentNo="";
        this.data.RONo="";
        this.data.Quantity=0;
        if(newValue){
            this.data.AvalComponentId=newValue.Id;
            this.data.Article=newValue.Article;
            this.data.AvalComponentNo=newValue.AvalComponentNo;
            this.data.RONo=newValue.RONo;
            this.data.Quantity=newValue.Quantities;
        }
       
    }
}