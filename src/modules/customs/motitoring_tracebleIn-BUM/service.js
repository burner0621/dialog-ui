import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";


const serviceUri = 'traceable';


export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
  
        var endpoint = `${serviceUri}`;
        console.log(endpoint);
        return super.list(endpoint,info);
    }

    generateExcel(args) {
        var endpoint = `${serviceUri}/download?bum=${args.bum}`;
        return super.getXls(endpoint);  
    }

}
