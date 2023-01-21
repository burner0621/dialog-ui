import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";


// const serviceUri = 'purchase-requests/by-user';

const serviceUriPaymentDisposition = 'payment-disposition-note';
const serviceUri = 'purchasing-dispositions';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}/by-user`;
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

    getDispositions(info) {
        var endpoint = `${serviceUri}/disposition`;
        return super.list(endpoint, info);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    } 

    searchPaymentDispo(epoId) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("finance");
        var _serviceUri = `${serviceUriPaymentDisposition}/byEpoId/${epoId}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }
} 
