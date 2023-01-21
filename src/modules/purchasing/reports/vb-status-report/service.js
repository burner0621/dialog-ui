import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'vb-status-report';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "finance");
    }

    getReport(info) {
        var endpoint = `${serviceUri}/reports`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info);
        return super.getXls(endpoint);
    }

    _getEndPoint(info) {
        var endpoint = `${serviceUri}/reports/xls?`;
        var query = '';

        if (info.unitId) {
            if (query === '') query = `unitId=${info.unitId}`;
            else query = `${query}&unitId=${info.unitId}`;
        }

        if (info.vbRequestId) {
            if (query === '') query = `vbRequestId=${info.vbRequestId}`;
            else query = `${query}&vbRequestId=${info.vbRequestId}`;
        }
        
        if (info.applicantName) {
            if (query === '') query = `applicantName=${info.applicantName}`;
            else query = `${query}&applicantName=${info.applicantName}`;
        }

        if (info.clearanceStatus) {
            if (query === '') query = `clearanceStatus=${info.clearanceStatus}`;
            else query = `${query}&clearanceStatus=${info.clearanceStatus}`;
        }

        if (info.requestDateFrom) {
            if (query === '') query = `requestDateFrom=${info.requestDateFrom}`;
            else query = `${query}&requestDateFrom=${info.requestDateFrom}`;
        }

        if (info.requestDateTo) {
            if (query === '') query = `requestDateTo=${info.requestDateTo}`;
            else query = `${query}&requestDateTo=${info.requestDateTo}`;
        }

        if (info.realizeDateFrom) {
            if (query === '') query = `realizeDateFrom=${info.realizeDateFrom}`;
            else query = `${query}&realizeDateFrom=${info.realizeDateFrom}`;
        }

        if (info.realizeDateTo) {
            if (query === '') query = `realizeDateTo=${info.realizeDateTo}`;
            else query = `${query}&realizeDateTo=${info.realizeDateTo}`;
        }

        if (query !== '')
            endpoint = `${serviceUri}/reports/xls?${query}`;

        return endpoint;
    }
}