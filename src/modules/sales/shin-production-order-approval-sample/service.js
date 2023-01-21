import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'sales/production-orders/shin';
const scUri = 'sales/finishing-printing-sales-contracts/shin';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "sales");
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

    getPdfById(id) {
        var endpoint = `${serviceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }

    getSCbyId(no) {
        var _serviceUri = `sales/finishing-printing-sales-contracts`;

        var endpoint = `${_serviceUri}/${no}`;
        return super.get(endpoint);
    }

    close(data) {
        var endpoint = 'sales/production-order-close';
        return super.post(endpoint, data);
    }

    approveSample(id) {
        var endpoint = `${serviceUri}/approve/sample/${id}`;
        return super.post(endpoint);
    }
}