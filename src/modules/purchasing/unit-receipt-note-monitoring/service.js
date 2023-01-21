import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service'; 

const serviceUri = 'unit-receipt-notes/monitoring';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    // search(info) {
    //     var endpoint = `${serviceUri}?no=${no}&PRNo=${PRNo}&unitId=${unitId}&categoryId=${categoryId}&supplierId=${supplierId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    //     return super.get(endpoint);
    // }
    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    generateExcel(info) {
        var endpoint = `${serviceUri}/download?urnNo=${info.urnNo}&prNo=${info.prNo}&divisionId=${info.divisionId}&unitId=${info.unitId}&categoryId=${info.categoryId}&supplierId=${info.supplierId}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }

}
