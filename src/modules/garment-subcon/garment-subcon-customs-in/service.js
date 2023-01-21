import { RestService } from '../../../utils/rest-service';

const serviceUri = 'subcon-customs-ins';
const serviceDoUri = 'garment-delivery-orders';
const subconContractUri = 'subcon-contracts';

class Service extends RestService {
	constructor(http, aggregator, config, endpoint) {
		super(http, aggregator, config, "garment-production");
	}

	search(info) {
		var endpoint = `${serviceUri}`;
		return super.list(endpoint, info);
	}

	searchComplete(info) {
		var endpoint = `${serviceUri}/complete`;
		return super.list(endpoint, info);
	}

	create(data) {
		var endpoint = `${serviceUri}`;
		return super.post(endpoint, data);
	}

	read(id) {
		var endpoint = `${serviceUri}/${id}`;
		return super.get(endpoint);
	}

	update(data) {
		var endpoint = `${serviceUri}/${data.Id}`;
		return super.put(endpoint, data);
	}

	delete(data) {
		var endpoint = `${serviceUri}/${data.Id}`;
		return super.delete(endpoint, data);
	}

	getSubconContractByID(id) {
		var endpoint = `${subconContractUri}/${id}`;
		return super.get(endpoint);
	}
}

class PurchasingService extends RestService {
	constructor(http, aggregator, config, api) {
		super(http, aggregator, config, "purchasing-azure");
	}

	getGarmentDo(info) {
		var endpoint = `${serviceDoUri}`;
		return super.list(endpoint, info);
	}
}


export { Service, PurchasingService }