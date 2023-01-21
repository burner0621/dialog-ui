import { inject, Lazy } from "aurelia-framework";
import { RestService } from "../../../../utils/rest-service";

const serviceUri = "garment-invoice-purchasing-disposition";

export class Service extends RestService {
	constructor(http, aggregator, config, endpoint) {
		super(http, aggregator, config, "finance");
	}

	search(info) {
		let endpoint = `${serviceUri}/monitoring`;
		console.log(info);
		return super.list(endpoint, info);
	}

	getXls(info) {
		let endpoint = `${serviceUri}/download?invoiceNo=${info.invoiceNo}&dispositionNo=${info.dispositionNo}&startDate=${info.startDate}&endDate=${info.endDate}`;
		console.log(info);
		return super.getXls(endpoint);
	}
}
