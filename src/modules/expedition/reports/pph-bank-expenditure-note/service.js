import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceURI = 'expedition/pph-bank-expenditure-notes-report';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }
    
    search(info) {
        let endpoint = `${serviceURI}`;
        return super.list(endpoint, info);
    }
}
