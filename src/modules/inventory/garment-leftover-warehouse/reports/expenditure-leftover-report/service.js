import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = "garment/leftover-warehouse-expenditures/report-expenditures";

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

        if (info.receiptType)
            if (query === '') query = `receiptType=${info.receiptType}`;
            else query = `${query}&receiptType=${info.receiptType}`;
    
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