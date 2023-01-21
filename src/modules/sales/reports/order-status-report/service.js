import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'order-status-reports';
const historyServiceUri = 'sales/order-status-histories';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production-azure");
    }

    getYearly(info) {
        var endpoint = `${serviceUri}/yearly/?year=${parseInt(info.year)}&orderTypeId=${info.orderTypeId}`;
        return super.get(endpoint);
    }

    getYearlyXls(info) {
        var endpoint = `${serviceUri}/yearly/downloads/xls?year=${parseInt(info.year)}&orderTypeId=${info.orderTypeId}`;
        return super.getXls(endpoint);
    }

    getMonthly(info) {
        var endpoint = `${serviceUri}/monthly/?year=${parseInt(info.year)}&month=${parseInt(info.month)}&orderTypeId=${info.orderTypeId}`;
        return super.get(endpoint);
    }

    getMonthlyXls(info) {
        var endpoint = `${serviceUri}/monthly/downloads/xls?year=${parseInt(info.year)}&month=${parseInt(info.month)}&orderTypeId=${info.orderTypeId}`;
        return super.getXls(endpoint);
    }

    getByOrderId(info) {
        var endpoint = `${serviceUri}/by-order-id/?orderId=${parseInt(info.orderId)}`;
        return super.get(endpoint);
    }

    getByOrderIdXls(info) {
        var endpoint = `${serviceUri}/by-order-id/downloads/xls?orderId=${parseInt(info.orderId)}`;
        return super.getXls(endpoint);
    }

    // getByProductionOrderId(info) {
    //     var endpoint = ``
    // }

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