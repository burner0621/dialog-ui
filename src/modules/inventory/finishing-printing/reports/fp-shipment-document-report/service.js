import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = "inventory/reports/fp-shipment-document";

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory");
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

        if (info.shipmentNumber) {
            query = (query === '') ? `shipmentNumber=${info.shipmentNumber}` : `${query}&shipmentNumber=${info.shipmentNumber}`;
        }

        if (info.deliveryCode) {
            query = (query === '') ? `deliveryCode=${info.deliveryCode}` : `${query}&deliveryCode=${info.deliveryCode}`;
        }

        if (info.productIdentity) {
            query = (query === '') ? `productIdentity=${info.productIdentity}` : `${query}&productIdentity=${info.productIdentity}`;
        }

        if (info.buyerId) {
            query = (query === '') ? `buyerId=${info.buyerId}` : `${query}&buyerId=${info.buyerId}`;
        }

        if (info.productionOrderNo) {
            query = (query === '') ? `productionOrderNo=${info.productionOrderNo}` : `${query}&productionOrderNo=${info.productionOrderNo}`;
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