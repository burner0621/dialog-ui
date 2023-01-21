import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = 'duration-report/garment-purchase-order-to-purchase-order-external-duration-reports';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
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
        info.offset = new Date().getTimezoneOffset() / 60 * -1;
        if (query === '') query = `offset=${info.offset}`;
        else query = `${query}&offset=${info.offset}`; 
        
        if (info.duration) {
            if (query === '') query = `duration=${info.duration}`;
            else query = `${query}&duration=${info.duration}`;
        }
        if (info.unitId) {
            if (query === '') query = `unitId=${info.unitId}`;
            else query = `${query}&unitId=${info.unitId}`;
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