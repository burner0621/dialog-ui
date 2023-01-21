import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
// import { Container } from 'aurelia-dependency-injection';
// import { Config } from "aurelia-api";

const serviceUri = 'garment-sample-receipt-from-buyer';
const sampleRequestUri = 'garment-sample-requests';
 
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        console.log(endpoint);
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        console.log(data);
        return super.post(endpoint, data);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        console.log(endpoint);
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }

    getSampleRequest(info) {
        var endpoint = `${sampleRequestUri}`;
        return super.list(endpoint, info);
    }

}


const servicePLUri = 'garment-shipping/packing-lists/loaderSampleRO';
const servicePLStyleUri = 'garment-shipping/packing-lists/loaderSampleStyle';
export class PackingService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "packing-inventory");
    }

    getRO(info) {
        var endpoint = `${servicePLUri}`;
        return super.list(endpoint, info);
    }
    getStyle(roNo) {
        var endpoint = `${servicePLStyleUri}/${roNo}`;
 
        return super.get(endpoint);
    }
}


