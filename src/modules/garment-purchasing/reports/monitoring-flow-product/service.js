import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'monitoring-flow-product';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        let endpoint = `${serviceUri}?dono=${info.dono}&beacukaino=${info.beacukaino}&beacukaino=${info.productCode}`;
        // let endpoint = `${serviceUri}`;
       
        return super.get(endpoint, info);
    }

    generateExcel(args) {
        var endpoint = `${serviceUri}/download?dono=${args.dono}&beacukaino=${args.beacukaino}&beacukaino=${args.productCode}`;
        return super.getXls(endpoint);
    }

}
