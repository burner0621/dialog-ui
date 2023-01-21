import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'garment-stock-report';
const UnitServiceUri = 'master/units';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        // let endpoint = `${serviceUri}?unitcode=${info.unitcode}&category=${info.category}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        let endpoint = `${serviceUri}`;
       
        return super.list(endpoint, info);
    }

    generateExcel(args) {
        var endpoint = `${serviceUri}/download?unitcode=${args.unitcode}&categoryname=${args.categoryname}&unitname=${args.unitname}&category=${args.category}&dateFrom=${args.dateFrom}&dateTo=${args.dateTo}`;
        return super.getXls(endpoint);
    }

}

export class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getSampleUnit(info) {
        var endpoint = `${UnitServiceUri}`;
        return super.list(endpoint, info);
    }
}
