import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';


const serviceUri = 'unit-payment-orders/monitoringtax';


export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

 
    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }
    
    getXls(info) {

        var endpoint = `${serviceUri}/download?supplierId=${info.supplierId}&taxno=${info.taxno}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&taxdateFrom=${info.taxdateFrom}&taxdateTo=${info.taxdateTo}`;
        return super.getXls(endpoint);
    }
}
