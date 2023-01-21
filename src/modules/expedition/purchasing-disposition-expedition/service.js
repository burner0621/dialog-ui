import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'purchasing-disposition-expeditions';
const PDNoUri = 'purchasing-dispositions'

export class PurchasingService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }

    getPDNo(no) {
        let endpoint = `${PDNoUri}/${no}`;
        return super.get(endpoint);
    }
}

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "finance");
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        let endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        let endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    // update(data) {
    //     var endpoint = `${serviceUri}/${data.Id}`;
    //     return super.put(endpoint, data);
    // }

    delete(data) {
        let endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }
} 
