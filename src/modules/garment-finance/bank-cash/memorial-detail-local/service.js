import { RestService } from '../../../../utils/rest-service';
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUri = "garment-memorial-detail-locals";
const coaUri = "master/chart-of-accounts";
const currenciesUri = "master/currencies";
const ibCurrenciesUri = "master/bi-currencies";
const memorialUri = "garment-memorials";

class Service extends RestService {

	constructor(http, aggregator, config, api) {
		super(http, aggregator, config, "finance");
	}

	search(info) {
		let endpoint = `${serviceUri}`;
		return super.list(endpoint, info);
	}

	getById(id) {
		let endpoint = `${serviceUri}/${id}`;
		return super.get(endpoint);
	}

	getPdfById(id) {
		let endpoint = `${serviceUri}/${id}`;
		return super.getPdf(endpoint);
	}

	create(data) {
		let endpoint = `${serviceUri}`;
		return super.post(endpoint, data);
	}

	update(data) {
		let endpoint = `${serviceUri}/${data.Id}`;
		return super.put(endpoint, data);
	}

	delete(data) {
		let endpoint = `${serviceUri}/${data.Id}`;
		return super.delete(endpoint, data);
	}

	getChartOfAccounts(info) {
		let endpoint = `${coaUri}`;
		return super.list(endpoint, info);
	}

	getMemorialById(id) {
		let endpoint = `${memorialUri}/${id}`;
		return super.get(endpoint);
	}

}

const garmentCurrencyUri = 'master/garment-currencies/by-code-before-date';
class CoreService extends RestService {
	constructor(http, aggregator, config, api) {
		super(http, aggregator, config, "core");
	}

	getGarmentCurrencies(info) {
		var resource = `master/garment-currencies/by-before-date`;
		var config = Container.instance.get(Config);
		var endpoint = config.getEndpoint("core");

		return endpoint.find(resource, info)
			.then(results => {
				return results.data;
			});
	}

	getCurrencies(info) {
		let endpoint = `${currenciesUri}`;
		return super.list(endpoint, info);
	}

	getIBCurrencies(info) {
		let endpoint = `${ibCurrenciesUri}`;
		return super.list(endpoint, info);
	}

}

const invoiceServiceUri = 'garment-shipping/invoices';
const localSalesNoteUri = 'garment-shipping/local-sales-notes';
class PackingInvService extends RestService {
	constructor(http, aggregator, config, api) {
		super(http, aggregator, config, "packing-inventory");
	}

	getInvoiceById(id) {
		let endpoint = `${invoiceServiceUri}/${id}`;
		return super.get(endpoint);
	}

	getLocalSalesNoteById(id) {
		let endpoint = `${localSalesNoteUri}/${id}`;
		return super.get(endpoint);
	}

}

export { Service, CoreService, PackingInvService }