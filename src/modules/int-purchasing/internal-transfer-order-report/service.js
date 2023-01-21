import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'internal-transfer-orders/report';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "int-purchasing");
    }

    search(TRNo) {
        var endpoint = `${serviceUri}?TRNo=${TRNo}`;
        return super.get(endpoint);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    generateExcel(unitId, categoryId, PODLNo, PRNo, supplierId, dateFrom, dateTo, state,budgetId,staffName) {
        var endpoint = `${serviceUri}?unitId=${unitId}&categoryId=${categoryId}&PODLNo=${PODLNo}&PRNo=${PRNo}&supplierId=${supplierId}&dateFrom=${dateFrom}&dateTo=${dateTo}&state=${state}&budgetId=${budgetId}&staffName=${staffName}`;
        return super.getXls(endpoint);
    }

}
