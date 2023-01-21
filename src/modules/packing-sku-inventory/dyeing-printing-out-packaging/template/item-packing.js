import { inject, bindable, computedFrom } from 'aurelia-framework'
import{DataForm} from '../data-form'

@inject(DataForm)
export class PackingItem {
    @bindable product;
    @bindable title;
    @bindable readOnly;
    @bindable readOnlyKeterangan;
    @bindable data;
    @bindable error;
    constructor(dataFrom){
        this.dataForm = dataFrom;
    }
    bind(context){
        
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        this.context = context.context;

        this.packType=["WHITE","DYEING","BATIK","TEXTILE","DIGITAL PRINT","TRANFER PRINT"];
        this.packUnit=["ROLL","PIECE","POTONGAN"];
        
    }
}
