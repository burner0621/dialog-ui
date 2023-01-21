import { inject, bindable, computedFrom } from 'aurelia-framework';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

export class DetailFooter {
	activate(context) {
		this.context = context;
	}

	get amountSum() {
		var qty = this.context.items
			.map((item) => item.data.Amount);
		return qty
			.reduce((prev, curr, index) => { return prev + curr }, 0);
	}
}
