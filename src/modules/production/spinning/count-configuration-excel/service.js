import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'count-configurations/download';
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "spinning");
    }

    generateExcel(info) {
        var endpoint = `${serviceUri}?type=${info.type}`;
        return super.getXls(endpoint);
    }

}