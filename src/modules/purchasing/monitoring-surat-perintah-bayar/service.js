import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'unit-payment-orders/by-user-monitor';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing");
    }

    getDataSpb(unitId, supplierId, sdate, edate) {
        var endpoint = `${serviceUri}?unitId=${unitId}&supplierId=${supplierId}&dateFrom=${sdate}&dateTo=${edate}`;
        return super.get(endpoint);
    }


    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    generateExcel(unitId, PRNo, noSpb, supplierId, dateFrom, dateTo,staffName) {
        var endpoint = `${serviceUri}?unitId=${unitId}&PRNo=${PRNo}&noSpb=${noSpb}&supplierId=${supplierId}&dateFrom=${dateFrom}&dateTo=${dateTo}&staffName=${staffName}`;
        return super.getXls(endpoint);
    }

}
