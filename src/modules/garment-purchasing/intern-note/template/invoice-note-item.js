export class InvoiceNoteItem {
	
	activate(context) {
		this.data = context.data;
		this.error = context.error;
		this.readOnly = context.options.readOnly;
		this.data.pricePerDealUnit=this.data.pricePerDealUnit.toLocaleString('en-EN', { maximumFractionDigits: 4,minimumFractionDigits:4});
		this.data.quantity=this.data.quantity.toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2});
		this.data.priceTotal=this.data.priceTotal.toLocaleString('en-EN', { maximumFractionDigits: 2,minimumFractionDigits:2});
		var receiptQuantityTotal = 0;
		var deliveryOrderItems = this.data.deliveryOrder.items || [];
		for(let coba of deliveryOrderItems){
			for(let deliveryOrderDetail of coba.fulfillments){
				if(deliveryOrderDetail.Id == this.data.dODetailId){
					receiptQuantityTotal += deliveryOrderDetail.receiptQuantity;
				}
			}
		}
		this.status = receiptQuantityTotal > 0 ? "Sudah" : "Belum";
	}

	get total() {
		return this.data.dOQuantity * this.data.pricePerDealUnit;
	}
	
	get product() {
		return `${this.data.product.Code} - ${this.data.product.Name}`;
	}
}
