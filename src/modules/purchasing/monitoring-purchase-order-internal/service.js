import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'internal-purchase-orders/monitoring';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    // search(unitId, categoryId, PODLNo, PRNo, supplierId, dateFrom, dateTo, state,budgetId ,staffName) {
    //     var endpoint = `${serviceUri}?unitId=${unitId}&categoryId=${categoryId}&PODLNo=${PODLNo}&PRNo=${PRNo}&supplierId=${supplierId}&dateFrom=${dateFrom}&dateTo=${dateTo}&state=${state}&budgetId=${budgetId}&staffName=${staffName}`;
    //     return super.get(endpoint);
    // }

    /*search(unitId, categoryId) {
        var endpoint = `${serviceUri}?unitId=${unitId}&categoryId=${categoryId}`;
        return super.get(endpoint);
    }*/
    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    getXls(info) {
        var endpoint = `${serviceUri}/download?unitId=${info.unitId}&categoryId=${info.categoryId}&staff=${info.staff}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }

}
