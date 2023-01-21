import numeral from 'numeral';

export class UnitChargeFooter {
	controlOptions = {
		label: {
			length: 12,
			align: "right"
		},
		control: {
			length: 0
		}
	}


	async activate(context) {
		this.context = context;
		console.log(this.context);
	}

	get totalAmount() {
		const totalQuantity = this.context.items.reduce((acc, cur) =>
			acc += cur.data.amount, 0);
		return totalQuantity;

	}

	get error() {
		return this.context.options.error ? this.context.options.error.TotalQtySize : null;
	}
}