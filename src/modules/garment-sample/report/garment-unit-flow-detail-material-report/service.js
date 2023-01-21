import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../utils/rest-service';

//const uriPurchasingDocumentExpeditionReport = 'expedition/purchasing-document-expeditions-report';
const uriGRC = 'garment-flow-detail-material-reports';

const UnitServiceUri = 'master/units';
export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }
    
    search(info) {
        // console.log(info);
        // let endpoint = `${uriGRC}`;
        // return super.list(endpoint, info);
        // console.log(info);
        var endpoint = `${uriGRC}?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&unit=${info.unit}&category=${info.category}&productcode=${info.productcode}`;
        // return super.list(endpoint, info);
        return super.get(endpoint);
    }

    xls(info) {
        console.log(info)
        let endpoint = `${uriGRC}/download-for-unit?${buildQueryString(info)}`;
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


