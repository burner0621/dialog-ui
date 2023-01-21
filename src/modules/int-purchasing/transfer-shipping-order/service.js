import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";


const serviceUri = 'shipping-orders';
const transferDeliveryOrderServiceUri = 'transfer-delivery-orders';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "int-purchasing");
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

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getTransferDeliveryOrderById(id) {
        var endpoint = `${transferDeliveryOrderServiceUri}/${id}`;
        return super.get(endpoint);
    }

    post(data) {
        var endpoint = `${serviceUri}/so-post`;
        return super.put(endpoint, data);
    }

    unpost(id) {
        var endpoint = `${serviceUri}/so-unpost/${id}`;
        return super.put(endpoint);
    }

    pdf(data) {
        var endpoint = `${serviceUri}/pdf/${data.Id}`;
        return super.getPdf(endpoint);
    }

    isUsedByUnitReceiptNotes(id) {
        var endpoint = `${serviceUri}/isused/${id}`;
        return super.get(endpoint);
    }
}