import { RestService } from '../../../utils/rest-service';
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { data } from 'jquery';

const serviceUri = 'service-subcon-shrinkage-panels';
const garmentUnitDeliveryOrderItemsUri = 'garment-unit-delivery-orders';
const garmentUENUri = 'garment-unit-expenditure-notes';

class Service extends RestService {
	constructor(http, aggregator, config, endpoint) {
		super(http, aggregator, config, "garment-production");
	}

	search(info) {
		var endpoint = `${serviceUri}`;
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

	searchComplete(info) {
		var endpoint = `${serviceUri}/complete`;
		return super.list(endpoint, info);
	}

	getPdfById(id) {
        var endpoint = `${serviceUri}/get-pdf/${id}`;
        return super.getPdf(endpoint);
  	}

	getXls(info)
	{	
		var endpoint = `${serviceUri}/getXls?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
		return super.getXls(endpoint);
	}

}

class PurchasingService extends RestService {
	constructor(http, aggregator, config, api) {
		super(http, aggregator, config, "purchasing-azure");
	}

	getUnitExpenditureNotes(info) {
		var endpoint = `${garmentUENUri}`;
		return super.list(endpoint, info)
	}

	getUnitDeliveryOrderItems(id) {
		var endpoint = `${garmentUnitDeliveryOrderItemsUri}/item/${id}`;
		return super.get(endpoint);
	}
}


export { Service, PurchasingService }
