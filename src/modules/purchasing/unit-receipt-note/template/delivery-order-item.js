export class DeliveryOrderItem {
	activate(context) {
		this.data = context.data;
		this.error = context.error;
		this.readOnly = context.options.readOnly;
		if(this.data.deliveredQuantity){
			this.data.deliveredQuantity=this.data.deliveredQuantity.toLocaleString('en-EN', { minimumFractionDigits: 2 });
		  }
	}

	get product() {
		return `${this.data.product.code} - ${this.data.product.name}`;
	}
}