import { inject, bindable, computedFrom } from 'aurelia-framework'
import { Service } from '../service';

@inject(Service)
export class GarmentReceiptCorrectionItem {
  constructor(service) {
    this.service = service;
  }

	async activate(context) {
        this.context=context;
        this.data = context.data;
        this.error = context.error;
        this.readOnly = context.options.readOnly;	
        this.options = this.context.context.options; 
        
        if(this.context.context.options.Conv){
          if(this.data.OrderQuantity>0){
            this.data.isDO =true;
          }
        }

        //ambil dr DOItems
        var doItems= await this.service.getDOItemsById(this.data.URNItemId);
        this.data.leftOverQty=doItems.RemainingQuantity/this.data.Conversion;
	}

	get product() {
		return `${this.data.Product.Code} - ${this.data.Product.Name}`;
    }
    
    changeCheckBox() {
        this.context.context.options.checkedAll = this.context.context.items.reduce((acc, curr) => acc && curr.data.IsSave, true);
      }

    @computedFrom("data.CorrectionQuantity","data.CorrectionConversion", "data.Conversion", "data.leftOverQty", "context.context.options.Qty")
    get SmallQuantity() {
        // this.data.SmallQuantity = parseFloat((this.data.ReceiptQuantity * this.data.Conversion).toFixed(2));
        if(this.context.context.options.Qty && !this.readOnly){
            this.data.Conversion=this.data.OriginConversion;

            this.data.SmallQuantity = parseFloat(this.data.CorrectionQuantity * this.data.Conversion).toLocaleString('en-EN', { minimumFractionDigits: 2,maximumFractionDigits: 2  });
            
            return parseFloat(this.data.CorrectionQuantity * this.data.Conversion).toLocaleString('en-EN', { minimumFractionDigits: 2,maximumFractionDigits: 2  });
        }
        else if(this.context.context.options.Conv &&!this.readOnly){
            this.data.SmallQuantity = parseFloat(this.data.leftOverQty * this.data.CorrectionConversion).toLocaleString('en-EN', { minimumFractionDigits: 2,maximumFractionDigits: 2  });
            return parseFloat(this.data.leftOverQty * this.data.CorrectionConversion).toLocaleString('en-EN', { minimumFractionDigits: 2,maximumFractionDigits: 2  });
        }
        else if(this.readOnly){
          return parseFloat(this.data.SmallQuantity).toLocaleString('en-EN', { minimumFractionDigits: 2,maximumFractionDigits: 2  });
        }
		
    }

    @computedFrom("data.CorrectionQuantity","data.CorrectionConversion", "data.Conversion", "data.leftOverQty", "context.context.options.Qty")
    get leftOverQty() {
        // this.data.SmallQuantity = parseFloat((this.data.ReceiptQuantity * this.data.Conversion).toFixed(2));
        if(this.context.context.options.Qty && !this.readOnly){
            return parseFloat(this.data.leftOverQty+ this.data.CorrectionQuantity).toLocaleString('en-EN', { minimumFractionDigits: 2,maximumFractionDigits: 2  });
        }
        else{
            return parseFloat(this.data.leftOverQty).toLocaleString('en-EN', { minimumFractionDigits: 2,maximumFractionDigits: 2  });
        }
		
    }

    qtyChanged(e){
      this.data.CorrectionQuantity=e.srcElement.value;
    }

    
	conversionChanged(e) {
		if(!this.error)
		  this.error={};
		  if(this.data.CorrectionConversion%1>=0){
			  if(!((this.data.CorrectionConversion.length<=16 && this.data.CorrectionConversion.indexOf(".")>0) || (this.data.Conversion.length<=15 && this.data.Conversion.indexOf(".")<0))){
				this.error.Conversion="Konversi tidak boleh lebih dari 15 digit";
			  }
			  else if(this.data.CorrectionConversion==0 || this.data.CorrectionConversion=='0'){
				this.error.Conversion="Conversion can not 0";
			  }
			  else {
				this.error.Conversion=null;
			}
		  }
		  else {
			this.error.Conversion="Konversi Harus Diisi Dengan Angka";
		  }
		  this.data.CorrectionConversion=e.srcElement.value;
	    }
}