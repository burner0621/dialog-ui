import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'unit-payment-correction-notes/quantity-correction';
// const serviceUriretur = 'unit-payment-orders/corrections/quantities/retur';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    // update(data) {
    //     var endpoint = `${serviceUri}/${data._id}`;
    //     return super.put(endpoint, data);
    // }

    // delete(data) {
    //     var endpoint = `${serviceUri}/${data._id}`;
    //     return super.delete(endpoint, data);
    // }

    getUnitPaymentOrderById(id) {
        let endpoint = `unit-payment-orders/${id}`;
        return super.get(endpoint);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }

    getPdfReturById(id) {
        var endpoint = `${serviceUri}/pdfNotaRetur/${id}`;
        return super.getPdf(endpoint);
    }
    // getPdfReturById(id) {
    //     var endpoint = `${serviceUriretur}/${id}`;
    //     return super.getPdf(endpoint);
    // }
}