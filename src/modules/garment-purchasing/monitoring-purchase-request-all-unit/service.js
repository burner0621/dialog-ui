import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';


const serviceUri = 'purchase-requests/monitoring/all-user';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-purchasing");
    }

    search(unitId, categoryId, buyerId, PRNo, dateFrom, dateTo, state) { 
        var endpoint = `${serviceUri}?unitId=${unitId}&categoryId=${categoryId}&buyerId=${buyerId}&PRNo=${PRNo}&dateFrom=${dateFrom}&dateTo=${dateTo}&state=${state}`;
        return super.get(endpoint);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }
    
    generateExcel(unitId, categoryId, buyerId, PRNo, dateFrom, dateTo, state) {
        var endpoint = `${serviceUri}?unitId=${unitId}&categoryId=${categoryId}&buyerId=${buyerId}&PRNo=${PRNo}&dateFrom=${dateFrom}&dateTo=${dateTo}&state=${state}`;
        return super.getXls(endpoint);
    }
}
