import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'vb-expedition-realization-report';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "finance");
    }

    getReport(info) {
        var endpoint = `${serviceUri}/reports`;
        return super.list(endpoint, info);
    }

    getDetailReport(id) {
        var endpoint = `${serviceUri}/reports/detail/${id}`;
        return super.get(endpoint);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info);
        return super.getXls(endpoint);
    }

    _getEndPoint(info) {
        var endpoint = `${serviceUri}/reports/xls?`;
        var query = '';

        if (info.vbRequestId) {
            if (query === '') query = `vbRequestId=${info.vbRequestId}`;
            else query = `${query}&vbRequestId=${info.vbRequestId}`;
        }

        if (info.vbRealizeId) {
            if (query === '') query = `vbRealizeId=${info.vbRealizeId}`;
            else query = `${query}&vbRealizeId=${info.vbRealizeId}`;
        }
        
        if (info.applicantName) {
            if (query === '') query = `applicantName=${info.applicantName}`;
            else query = `${query}&applicantName=${info.applicantName}`;
        }

        if (info.unitId) {
            if (query === '') query = `unitId=${info.unitId}`;
            else query = `${query}&unitId=${info.unitId}`;
        }

        if (info.divisionId) {
            if (query === '') query = `divisionId=${info.divisionId}`;
            else query = `${query}&divisionId=${info.divisionId}`;
        }

        if (info.isVerified) {
            if (query === '') query = `isVerified=${info.isVerified}`;
            else query = `${query}&isVerified=${info.isVerified}`;
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