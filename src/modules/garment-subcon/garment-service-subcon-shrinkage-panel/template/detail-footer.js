export class DetailFooter {
	controlOptions = {
		label: {
			length: 12,
			align: "right"
		},
		control: {
			length: 0
		}
	}


	activate(context) {
		this.context = context;
	}

	get totalQuantity() {
		const totalQuantity = this.context.items.reduce((acc, cur) =>
			acc += cur.data.Quantity, 0);
		return totalQuantity;
	}

	get error() {
		return this.context.options.error ? this.context.options.error.TotalQtySize : null;
	}
}