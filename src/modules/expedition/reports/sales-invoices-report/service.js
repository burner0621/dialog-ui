import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'sales/sales-invoices/reports';
//const serviceDetailsUri = 'sales/reports/production-order-report/details';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "sales");
    }

    getReport(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getDetailReport(id) {
        var endpoint = `${serviceUri}/detail/${id}`;
        return super.get(endpoint);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info);
        return super.getXls(endpoint);
    }

    _getEndPoint(info) {
        var endpoint = `${serviceUri}/xls?`;
        var query = '';

        if (info.buyerId) {
            if (query === '') query = `buyerId=${info.buyerId}`;
            else query = `${query}&buyerId=${info.buyerId}`;
        }

        if (info.salesInvoiceId) {
            if (query === '') query = `salesInvoiceId=${info.salesInvoiceId}`;
            else query = `${query}&salesInvoiceId=${info.salesInvoiceId}`;
        }

        if (info.isPaidOff) {
            if (query === '') query = `isPaidOff=${info.isPaidOff}`;
            else query = `${query}&isPaidOff=${info.isPaidOff}`;
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
            endpoint = `${serviceUri}/xls?${query}`;

        return endpoint;
    }
}