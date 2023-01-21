import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../../utils/rest-service';

const serviceUri = 'unit-receipt-note-monitoring-all';

const UnitServiceUri = 'master/units';
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }
search(info) {
    console.log(info);
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }
generateXls(no,  refNo,  roNo,  doNo,  unit,  supplier, dateFrom, dateTo) { 
       console.log(no,  refNo,  roNo,  doNo,  unit,  supplier, dateFrom, dateTo);
        var endpoint = `${serviceUri}/download?no=${no}&refNo=${refNo}&roNo=${roNo}&doNo=${doNo}&unit=${unit}&supplier=${supplier}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
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
