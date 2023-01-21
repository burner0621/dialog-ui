import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = "garment-memorials";
const coaUri = "master/chart-of-accounts";
const coreBankUri = 'master/account-banks';
const coreBudgetUri = 'master/budget-currencies';

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
}

const biCurrencyUri = 'master/bi-currencies';
class CoreService extends RestService {
	constructor(http, aggregator, config, api) {
		super(http, aggregator, config, "core");
	}

	getAccountBank(info) {
		let endpoint = `${coreBankUri}`;
		return super.list(endpoint, info);
	}

	getBICurrencies(info) {
		let endpoint = `${biCurrencyUri}`;
		return super.list(endpoint, info);
	}

}


export { Service, CoreService }