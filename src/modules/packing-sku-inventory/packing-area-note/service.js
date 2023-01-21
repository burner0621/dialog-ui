import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'packing-area-note';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
    }

    getReport(sdate, zone, group, mutation) {
        var endpoint = `${serviceUri}`;
        var query = '';

        if (sdate) {
            if (query === '') query = `searchDate=${(sdate)}`;
            else query = `${query}&searchDate=${(sdate)}`;
        }
        if (zone) {
            if (query === '') query = `zone=${(zone)}`;
            else query = `${query}&zone=${(zone)}`;
        }
        if (group) {
            if (query === '') query = `group=${group}`;
            else query = `${query}&group=${group}`;
        }
        if (mutation) {
            if (query === '') query = `mutation=${mutation}`;
            else query = `${query}&mutation=${mutation}`;
        }
        if (query !== '')
            endpoint = `${serviceUri}?${query}`;

        return super.get(endpoint);
    }

    generateExcel(sdate, zone, group, mutation) {

        var endpoint = `${serviceUri}/xls`;
        var query = '';
        if (sdate) {
            if (query === '') query = `searchDate=${(sdate)}`;
            else query = `${query}&searchDate=${(sdate)}`;
        }
        if (zone) {
            if (query === '') query = `zone=${(zone)}`;
            else query = `${query}&zone=${(zone)}`;
        }
        if (group) {
            if (query === '') query = `group=${group}`;
            else query = `${query}&group=${group}`;
        }
        if (mutation) {
            if (query === '') query = `mutation=${mutation}`;
            else query = `${query}&mutation=${mutation}`;
        }
        if (query !== '')
            endpoint = `${endpoint}?${query}`;

        return super.getXls(endpoint);
    }
}