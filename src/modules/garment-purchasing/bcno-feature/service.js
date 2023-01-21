import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'bcno-feature';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        let endpoint = `${serviceUri}?filter=${info.filter}&keyword=${info.keyword}`;
        return super.get(endpoint);
    }

    generateExcel(args) {
        var endpoint = `${serviceUri}/download?unitcode=${args.unitcode}&categoryname=${args.categoryname}&unitname=${args.unitname}&category=${args.category}&dateFrom=${args.dateFrom}&dateTo=${args.dateTo}`;
        return super.getXls(endpoint);
    }

}