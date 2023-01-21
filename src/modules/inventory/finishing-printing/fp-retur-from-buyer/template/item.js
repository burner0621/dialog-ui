import {bindable} from 'aurelia-framework';
import { Config } from "aurelia-api";
import { Container } from 'aurelia-dependency-injection';

export class NewProduct {
    async activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
    }

    get getTotLength(){
        var totLength = 0;
        if(this.data && this.data.Length && this.data.ReturnQuantity){
            totLength = Number(this.data.Length) * Number(this.data.ReturnQuantity);
        }
        return totLength.toFixed(2);
    }

    get getTotWeight(){
        var totWeight = 0;
        if(this.data && this.data.Weight && this.data.ReturnQuantity){
            totWeight = Number(this.data.Weight) * Number(this.data.ReturnQuantity);
        }
        return totWeight.toFixed(2);
    }

    get getDesign(){
        var design = '';
        if(this.data && this.data.DesignCode && this.data.DesignNumber)
            design += `${this.data.DesignCode} - ${this.data.DesignNumber}`;
        else if(this.data && this.data.DesignCode && !this.data.DesignNumber)
            design += `${this.data.DesignCode}`;
        else if(this.data && !this.data.DesignCode && this.data.DesignNumber)
            design += `${this.data.DesignNumber}`;
        return design;
    }

    controlOptions = {
        control: {
        length: 12
        }
    };
}