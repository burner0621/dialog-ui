import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = "inventory/inventory-movement-reports";

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info);
        return super.getXls(endpoint);
    }

    _getEndPoint(info) {
        var endpoint = `${serviceUri}/download`;
        var query = '';
        // if (info.order && typeof info.order === "object"){
        //     info.order = JSON.stringify(info.order);

        //     query = `${query}&order=${info.order}`;
        // }
        // else
        //     delete info.order;

        // if (info.keyword)
        //     query = `${query}&keyword=${info.keyword}`;

        if (info.type)
            if (query === '') query = `type=${info.type}`;
            else query = `${query}&type=${info.type}`;
    
        if (info.storageCode)
            if (query === '') query = `storageCode=${info.storageCode}`;
            else query = `${query}&storageCode=${info.storageCode}`;

        if (info.productCode)
            if(query === '') query = `productCode=${info.productCode}`
            else query = `${query}&productCode=${info.productCode}`; 

        if (info.dateFrom)
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;    

        if (info.dateTo) {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }

        if (query !== '')
            endpoint = `${serviceUri}/download?${query}`;

        return endpoint;
    }
}