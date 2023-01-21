import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceURI = 'expedition/unit-payment-order-paid-status-report';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }
    
    search(info) {
        console.log(info);
        let endpoint = `${serviceURI}`;
        return super.list(endpoint, info);
    }
}
