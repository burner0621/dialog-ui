export class Detail {
	
	activate(context) {
		this.data = context.data;
		this.error = context.error;
		this.readOnly = context.options.readOnly;
	}

	get total() {
		return this.data.dOQuantity * this.data.pricePerDealUnit;
	}
	
	get product() {
		return `${this.data.product.Code} - ${this.data.product.Name}`;
	}
}
