import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = "bank-cash-receipts";
const coaUri = "master/chart-of-accounts";
const coreBankUri = 'master/account-banks';
const coreBudgetUri = 'master/budget-currencies';
const ibCurrenciesUri = 'master/bi-currencies';

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

class CoreService extends RestService {
	constructor(http, aggregator, config, api) {
		super(http, aggregator, config, "core");
	}

	getAccountBank(info) {
		let endpoint = `${coreBankUri}`;
		return super.list(endpoint, info);
	}

	getBudgetCurrencies(info) {
		let endpoint = `${coreBudgetUri}`;
		return super.list(endpoint, info);
	}

	getIBCurrencies(info) {
		let endpoint = `${ibCurrenciesUri}`;
		return super.list(endpoint, info);
	}
}


export { Service, CoreService }