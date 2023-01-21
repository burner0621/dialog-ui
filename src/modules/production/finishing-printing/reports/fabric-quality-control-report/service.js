import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = 'finishing-printing/reports/fabric-quality-control-report';
const fabricServiceUri = 'finishing-printing/quality-control/defect'

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production-azure");
    }

    search(info) {
        var endpoint = `${fabricServiceUri}/reports`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info);
        return super.getXls(endpoint);
    }

    _getEndPoint(info) {
        var endpoint = `${fabricServiceUri}/reports/downloads/xls`;
        var query = '';

        if (info.productionOrderNo) {
            if (query === '') query = `productionOrderNo=${info.productionOrderNo}`;
            else query = `${query}&productionOrderNo=${info.productionOrderNo}`;
        }

        if (info.cartNo) {
            if (query === '') query = `cartNo=${info.cartNo}`;
            else query = `${query}&cartNo=${info.cartNo}`;
        }

        if (info.productionOrderType) {
            if (query === '') query = `productionOrderType=${info.productionOrderType}`;
            else query = `${query}&productionOrderType=${info.productionOrderType}`;
        }

        if (info.shiftIm) {
            if (query === '') query = `shiftIm=${info.shiftIm}`;
            else query = `${query}&shiftIm=${info.shiftIm}`;
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
        var endpoint = `${fabricServiceUri}/${id}`;
        return super.get(endpoint);
    }

    getByCode(code) {
        var endpoint = `${fabricServiceUri}?keyword=${code}`;
        return super.get(endpoint);
    }

    searchFabricQC(info) {
        var endpoint = `${fabricServiceUri}`;
        return super.list(endpoint, info)
    }
}