import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'garment-purchase-orders/monitoring';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(args) {
        let endpoint = `${serviceUri}`;
       
        return super.list(endpoint, args);
    }

    generateExcel(epono, unit, roNo, article, poSerialNumber, username, doNo, ipoStatus, supplier, status, dateFrom, dateTo, dateFromEx, dateToEx) {
        var endpoint = `${serviceUri}/download?unit=${unit}&article=${article}&poSerialNumber=${poSerialNumber}&ipoStatus=${ipoStatus}&epono=${epono}&roNo=${roNo}&doNo=${doNo}&supplier=${supplier}&username=${username}&dateFrom=${dateFrom}&dateTo=${dateTo}&dateFromEx=${dateFromEx}&dateToEx=${dateToEx}&status=${status}`;
        return super.getXls(endpoint);
    }

}
