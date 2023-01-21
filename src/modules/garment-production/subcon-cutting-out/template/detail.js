import { inject, bindable, computedFrom } from 'aurelia-framework'
import { CoreService } from '../service';
const SizeLoader = require('../../../../loader/size-loader');

@inject(CoreService)
export class Detail {
    @bindable selectedSize;

    get sizeLoader() {
        return SizeLoader;
    }

    constructor(coreService) {
        this.coreService = coreService;
    }

    // @computedFrom("data.Quantity", "data.Conversion")
    // get convertedQuantity() {
    //     return parseFloat((this.data.Quantity * this.data.Conversion).toFixed(2));
    // }

    activate(context) {
        this.context = context;
        this.data = context.data;
        this.error = context.error;
        this.options = context.options;
        if(this.data.Size){
            this.selectedSize = this.data.Size;
        }
        if(!this.data.CuttingOutUom){
            this.data.CuttingOutUom = {
                Unit : 'PCS'
            };
        }
        this.readOnly = this.options.readOnly;
        this.isCreate = context.context.options.isCreate;

    }

    async selectedSizeChanged(newValue) {
        if (newValue) {
            this.data.Size = newValue;
            let uomResult = await this.coreService.getUom({ size: 1,keyword: 'PCS', filter: JSON.stringify({ Unit: 'PCS' }) });
            this.data.CuttingOutUom = uomResult.data[0];
        } else {

            this.data.CuttingOutUom = [];
        }
    }

    CuttingOutQuantityChanged(e){
        this.data.CuttingOutQuantity=parseFloat(e.srcElement.value);
        this.data.Price=(this.data.BasicPrice + (this.data.ComodityPrice * 25/100)) * this.data.CuttingOutQuantity;
        
    }

    sizeView = (size) => {
        return `${size.Size}`;
    }

}