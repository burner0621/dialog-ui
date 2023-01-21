import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = 'finishing-printing/quality-control/packings/reports';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production-azure");
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
        
        var endpoint = `${serviceUri}/downloads/xls`;
        var query = '';
        if (info.code) {
            if (query === '') query = `code=${info.code}`;
            else query = `${query}&code=${info.code}`;
        }
        if (info.productionOrderNo) {
            if (query === '') query = `productionOrderNo=${info.productionOrderNo}`;
            else query = `${query}&productionOrderNo=${info.productionOrderNo}`;
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
            endpoint = `${endpoint}?${query}`;

        return endpoint;
    }


    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }



    getByCode(code) {
        var endpoint = `${serviceUri}?keyword=${code}`;
        return super.get(endpoint);
    }

}