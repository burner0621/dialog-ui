import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../../../utils/rest-service';

const serviceUri = 'garment/leftover-warehouse-receipts/monitoring';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory-azure");
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        let endpoint = `${serviceUri}/download?${buildQueryString(info)}`;
        return super.getXls(endpoint);
    }

    // generateExcel(info) {
    //     var endpoint = `${serviceUri}/download`;
    //     var query = '';
    //     if (info.type)
    //         if (query === '') query = `type=${info.type}`;
    //         else query = `${query}&type=${info.type}`;
    
    //     if (info.dateFrom)
    //         if (query === '') query = `dateFrom=${info.dateFrom}`;
    //         else query = `${query}&dateFrom=${info.dateFrom}`;    

    //     if (info.dateTo) {
    //         if (query === '') query = `dateTo=${info.dateTo}`;
    //         else query = `${query}&dateTo=${info.dateTo}`;
    //     }

    //     if (query !== '')
    //         endpoint = `${serviceUri}/download?${query}`;

    //     return endpoint;
    // }
}