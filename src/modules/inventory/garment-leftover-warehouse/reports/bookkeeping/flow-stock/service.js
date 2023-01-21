import { buildQueryString } from 'aurelia-path';
import { RestService } from '../../../../../../utils/rest-service';

const serviceUri = 'garment/leftover-warehouse-stocks/report';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory-azure");
    }

    search(info) {
        let endpoint = `${serviceUri}/flowstock`;
        return super.list(endpoint, info);

    }

    xls(info) {
        var endpoint = this._getEndPoint(info);
        return super.getXls(endpoint);
    }

    _getEndPoint(info) {
        var endpoint = `${serviceUri}/download-flow-stock`;
        var query = '';

        if (info.dateFrom)
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;

        if (info.dateTo) {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }
        if (info.unit && info.unit !== "") {
            if (query === '') query = `unit=${info.unit}`;
            else query = `${query}&unit=${info.unit}`;
        }
        if (info.categoryName && info.categoryName !== "") {
            if (query === '') query = `categoryName=${info.categoryName}`;
            else query = `${query}&categoryName=${info.categoryName}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}/download-flow-stock?${query}`;

        return endpoint;
    }
}