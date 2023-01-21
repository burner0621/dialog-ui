import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = "inventory/reports/packing-receipts";

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production");
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
        var endpoint = `${serviceUri}`;
        var query = '';

        if (info.packingCode) {
            query = (query === '') ? `packingCode=${info.packingCode}` : `${query}&packingCode=${info.packingCode}`;
        }

        if (info.buyer) {
            query = (query === '') ? `buyer=${info.buyer}` : `${query}&buyer=${info.buyer}`;
        }

        if (info.productionOrderNo) {
            query = (query === '') ? `productionOrderNo=${info.productionOrderNo}` : `${query}&productionOrderNo=${info.prodcutionOrderNo}`;
        }

        if (info._createdBy) {
            query = (query === '') ? `_createdBy=${info._createdBy}` : `${query}&_createdBy=${info._createdBy}`;
        }
        
        if (info.dateFrom)
            query = `${query}&dateFrom=${info.dateFrom}`;

        if (info.dateTo)
            query = `${query}&dateTo=${info.dateTo}`;

        if (query !== '') {
            endpoint = `${serviceUri}?${query}`;
        }

        return endpoint;
    }
}