import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'garment-disposition-purchase';
const serviceEPOUri = 'garment-external-purchase-orders';

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
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data}`;
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

    searchPaymentDispo(epoNo) {
        var endpoint = `${serviceEPOUri}/by-epo-no/?keyword=${epoNo}`;

        return super.find(endpoint)
            .then(result => {
                return result.data;
            });
    }

    getEPOById(param){
        // var endpoint = `${serviceEPOUri}/${epoId}`
        var endpoint = `${serviceUri}/po-external-id/${param.Id}?supplierId=${param.supplierId}&currencyCode=${param.currencyCode}`
        
        return super.get(endpoint)
    }
} 
