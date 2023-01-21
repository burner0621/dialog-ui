import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'unit-payment-orders';
const pdeServiceUri = 'expedition/purchasing-document-expeditions'

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

    update(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    }
    getPdfById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }

    getDefaultVat(info){
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/vat`;
        return _endpoint.find(_serviceUri, info)
        .then(result => {
            return result.data;
        })
    }
}

export class AzureService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    delete(data) {
        var endpoint = `${pdeServiceUri}/PDE/${data.no}`;
        return super.delete(endpoint, data);
    }
}