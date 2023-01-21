import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';


const serviceUri = 'purchase-requests/monitoring/by-user';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    // search(unitId, categoryId, budgetId, PRNo, dateFrom, dateTo, state) { 
    //     var endpoint = `${serviceUri}?unitId=${unitId}&categoryId=${categoryId}&budgetId=${budgetId}&PRNo=${PRNo}&dateFrom=${dateFrom}&dateTo=${dateTo}&state=${state}`;
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
    
    getXls(info) {
        //string no, string unitId, string categoryId, string budgetId, string prStatus, string poStatus, DateTime? dateFrom, DateTime? dateTo
        var endpoint = `${serviceUri}/download?no=${info.no}&unitId=${info.unitId}&categoryId=${info.categoryId}&budgetId=${info.budgetId}&prStatus=${info.prStatus}&poStatus=${info.poStatus}&productId=${info.productId}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}
