import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'garment-central-bill-reception/monitoring';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(args) {
        let endpoint = `${serviceUri}`;
       
        return super.list(endpoint, args);
    }

    generateExcel(dateFrom, dateTo, jnsbc) {

        var endpoint = `${serviceUri}/download?dateFrom=${dateFrom}&dateTo=${dateTo}&jnsbc=${jnsbc}`;
        return super.getXls(endpoint);
    }

}
