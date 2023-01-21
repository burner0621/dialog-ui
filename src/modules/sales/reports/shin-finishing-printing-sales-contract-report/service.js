import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'sales/finishing-printing-sales-contracts/report';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "sales");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info);
        return super.getXls(endpoint);
    }

    _getEndPoint(info)
    {
        var endpoint = `${serviceUri}/download`;
        var query = '';
        if (info.buyerCode) {
            if (query === '') query = `buyerCode=${info.buyerCode}`;
            else query = `${query}&buyerCode=${info.buyerCode}`;
        }
        if (info.orderTypeCode) {
            if (query === '') query = `orderTypeCode=${info.orderTypeCode}`;
            else query = `${query}&orderTypeCode=${info.orderTypeCode}`;
        }
        if (info.comodityCode) {
            if (query === '') query = `comodityCode=${info.comodityCode}`;
            else query = `${query}&comodityCode=${info.comodityCode}`;
        }
        if (info.no) {
            if (query === '') query = `no=${info.no}`;
            else query = `${query}&no=${info.no}`;
        }
        if (info.dateFrom) {
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;
        }
        if (info.dateTo) {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}/download?${query}`;
        
        return endpoint;
    }
}