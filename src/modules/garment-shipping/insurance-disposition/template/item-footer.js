import numeral from 'numeral';

export class ItemFooter {
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
		this.type = this.context.options.type;
		console.log(this.context);
	}

	get totalAmountIDR() {
		const totalQuantity = this.context.items.reduce((acc, cur) =>
			acc += cur.data.amountIDR, 0);
		return totalQuantity;
	}

	get totalAmountC2A() {
		const totalQuantity = this.context.items.reduce((acc, cur) =>
			acc += cur.data.amount2A, 0);
		return totalQuantity;
	}

	get totalAmountC2B() {
		const totalQuantity = this.context.items.reduce((acc, cur) =>
			acc += cur.data.amount2B, 0);
		return totalQuantity;
	}

	get totalAmountC2C() {
		const totalQuantity = this.context.items.reduce((acc, cur) =>
			acc += cur.data.amount2C, 0);
		return totalQuantity;
	}

	get totalAmountC1A() {
		const totalQuantity = this.context.items.reduce((acc, cur) =>
			acc += cur.data.amount1A, 0);
		return totalQuantity;
	}

	get totalAmountC1B() {
		const totalQuantity = this.context.items.reduce((acc, cur) =>
			acc += cur.data.amount1B, 0);
		return totalQuantity;
	}

	get error() {
		return this.context.options.error ? this.context.options.error.TotalQtySize : null;
	}
}