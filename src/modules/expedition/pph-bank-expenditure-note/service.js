import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = "expedition/pph-bank-expenditure-notes";

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "purchasing-azure");
    }

    getUnitPaymentOrders(info) {
        let endpoint = `${serviceUri}/loader/unit-payment-orders`;
        return super.list(endpoint, info);
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

    posting(items) {
        var endpoint = `${serviceUri}/posting`;
        return super.put(endpoint, items);
    }

    update(data) {
        let endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        let endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }
}
