import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = "inventory/reports/fp-retur-from-buyer-docs";

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        var endpoint = `${serviceUri}`;
        var query = '';
        if (info && info.dateFrom && info.dateFrom !== '') {
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;
        }
        if (info && info.dateTo && info.dateTo !== '') {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }
        if (info && info.destination && info.destination !== '') {
            if (query === '') query = `destination=${info.destination}`;
            else query = `${query}&destination=${info.destination}`;
        }
        if (info && info.code && info.code !== '') {
            if (query === '') query = `code=${info.code}`;
            else query = `${query}&code=${info.code}`;
        }
        if (info && info.buyer && info.buyer !== '') {
            if (query === '') query = `buyer=${info.buyer}`;
            else query = `${query}&buyer=${info.buyer}`;
        }
        if (info && info.productionOrderNo && info.productionOrderNo !== '') {
            if (query === '') query = `productionOrderNo=${info.productionOrderNo}`;
            else query = `${query}&productionOrderNo=${info.productionOrderNo}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;
        return super.getXls(endpoint);
    }
}