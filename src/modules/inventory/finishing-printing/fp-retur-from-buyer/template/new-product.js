import {bindable} from 'aurelia-framework';
import { Config } from "aurelia-api";
import { Container } from 'aurelia-dependency-injection';
var UomLoader = require('../../../../../loader/uom-loader');
var ConstructionLoader = require('../../../../../loader/material-loader');

export class NewProduct {
    @bindable construction;
    @bindable uom;
    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.construction = this.data.constructionSelected;
        this.uom = this.data.uomSelected;
        
    }

    get getTotLength(){
        var totLength = 0;
        if(this.data && this.data.length && this.data.returQuantity){
            totLength = Number(this.data.length) * Number(this.data.returQuantity);
        }
        return totLength.toFixed(2);
    }

    get getTotWeight(){
        var totWeight = 0;
        if(this.data && this.data.weight && this.data.returQuantity){
            totWeight = Number(this.data.weight) * Number(this.data.returQuantity);
        }
        return totWeight.toFixed(2);
    }

    get getDesign(){
        var design = '';
        if(this.data && this.data.designCode && this.data.designNumber)
            design += `${this.data.designCode} - ${this.data.designNumber}`;
        else if(this.data && this.data.designCode && !this.data.designNumber)
            design += `${this.data.designCode}`;
        else if(this.data && !this.data.designCode && this.data.designNumber)
            design += `${this.data.designNumber}`;
        return design;
    }

    constructionChanged(newValue, oldValue){
        var dataSelected = newValue;
        if(dataSelected){
            this.data.construction = dataSelected.code;
            this.data.constructionSelected = dataSelected;
        }
        else{
            this.data.construction = '';
            this.data.constructionSelected = {};
        }
    }

    uomChanged(newValue, oldValue){
        var dataSelected = newValue;
        if(dataSelected){
            this.data.uom = dataSelected.unit;
            this.data.uomSelected = dataSelected;
        }
        else{
            this.data.uom = '';
            this.data.uomSelected = {};
        }
    }

    get constructionLoader() {
        return ConstructionLoader;
    }

    get uomLoader() {
        return UomLoader;
    }

    controlOptions = {
        control: {
        length: 12
        }
    };
}