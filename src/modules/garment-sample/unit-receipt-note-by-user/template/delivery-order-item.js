import { computedFrom } from 'aurelia-framework'
export class DeliveryOrderItem {
	activate(context) {
		this.data = context.data;
		this.error = context.error;
		this.readOnly = context.options.readOnly;
		if (!this.data.Buyer) {
			this.data.Buyer = { Name: "" }
		}
	}

	get product() {
		return `${this.data.Product.Code} - ${this.data.Product.Name}`;
	}

    @computedFrom("data.ReceiptQuantity", "data.Conversion")
    get SmallQuantity() {
		// this.data.SmallQuantity = parseFloat((this.data.ReceiptQuantity * this.data.Conversion).toFixed(2));
		this.data.SmallQuantity = parseFloat(this.data.ReceiptQuantity * this.data.Conversion).toLocaleString('en-EN', { minimumFractionDigits: 2,maximumFractionDigits: 2  });;
        return parseFloat(this.data.ReceiptQuantity * this.data.Conversion).toLocaleString('en-EN', { minimumFractionDigits: 2,maximumFractionDigits: 2  });
	}
	
	conversionChanged(e) {
		if(!this.error)
		  this.error={};
		  if(this.data.Conversion%1>=0){
			  if(!((this.data.Conversion.length<=16 && this.data.Conversion.indexOf(".")>0) || (this.data.Conversion.length<=15 && this.data.Conversion.indexOf(".")<0))){
				this.error.Conversion="Konversi tidak boleh lebih dari 15 digit";
			  }
			  else if(this.data.Conversion==0 || this.data.Conversion=='0'){
				this.error.Conversion="Conversion can not 0";
			  }
			  else {
				this.error.Conversion=null;
			}
		  }
		  else {
			this.error.Conversion="Konversi Harus Diisi Dengan Angka";
		  }
		  this.data.Conversion=e.srcElement.value;
	    }
}