import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../utils/rest-service';

const uriGRC = 'garment-flow-detail-material-reports';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }
    
    search(info) {
        var endpoint = `${uriGRC}?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&unit=${info.unit}&category=${info.category}&productcode=${info.productcode}`;
        return super.get(endpoint);
    }

    xls(info) {
        console.log(info)
        let endpoint = `${uriGRC}/download?${buildQueryString(info)}`;
        return super.getXls(endpoint);
    }
}

const UnitServiceUri = 'master/units';
export class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getSampleUnit(info) {
        var endpoint = `${UnitServiceUri}`;
        return super.list(endpoint, info);
    }
}