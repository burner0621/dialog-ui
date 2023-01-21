import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = 'sales/reports/order-status-report';
const historyServiceUri = 'sales/order-status-histories';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    detail(info) {
        var endpoint = `${serviceUri}/${info.year}/${info.month}/${info.orderType}`;
        return super.get(endpoint);
    }

    kanbanDetail(info) {
        var endpoint = `${serviceUri}/${info.orderNo}`;
        return super.get(endpoint);
    }

    generateKanbanXls(info) {
        var endpoint = `${serviceUri}/${info.orderNo}`;
        return super.getXls(endpoint);
    }

    generateDetailXls(info) {
        var endpoint = `${serviceUri}/${info.year}/${info.month}/${info.orderType}`;
        return super.getXls(endpoint);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info);
        return super.getXls(endpoint);
    }

    _getEndPoint(info) {
        var endpoint = `${serviceUri}`;
        var query = '';

        if (info.orderType || info.orderType === "") {
            if (query === '')
                query = `orderType=${info.orderType}`;
            else
                query = `${query}&orderType=${info.processType}`;
        }

        if (info.year) {
            if (query === '')
                query = `year=${info.year}`;
            else
                query = `${query}&year=${info.year}`;
        }

        if (query !== '')
            endpoint = `${serviceUri}?${query}`;

        return endpoint;
    }

    /* Order Status History */
    createHistory(data) {
        let endpoint = `${historyServiceUri}`;
        return super.post(endpoint, data);
    }

}