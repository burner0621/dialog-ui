import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = 'yarn-output-production';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "spinning");
    }

    getReport(info) {
        var endpoint = `${serviceUri}/report`;
        var query = '';

        if (info.SpinningName) {
            if (query) query = `Unit=${info.SpinningName}`;
            else query = `${query}&Unit=${info.SpinningName}`;
        }

        if (info.YarnName) {
            if (query) query = `Yarn=${info.YarnName}`;
            else query = `${query}&Yarn=${info.YarnName}`;
        }

        if (info.dateFrom) {
            if (query) query = `DateFrom=${info.dateFrom}`;
            else query = `${query}&DateFrom=${info.dateFrom}`;
        }

        if (info.dateTo) {
            if (query) query = `DateTo=${info.dateTo}`;
            else query = `${query}&DateTo=${info.dateTo}`;
        }

        if (query) endpoint = `${endpoint}?${query}`;

        return super.get(endpoint);
    }

    generateExcel(info) {
        var endpoint = `${serviceUri}/download`;
        var query = '';

        if (info.SpinningName) {
            if (query) query = `Unit=${info.SpinningName}`;
            else query = `${query}&Unit=${info.SpinningName}`;
        }

        if (info.YarnName) {
            if (query) query = `Yarn=${info.YarnName}`;
            else query = `${query}&Yarn=${info.YarnName}`;
        }

        if (info.dateFrom) {
            if (query) query = `DateFrom=${info.dateFrom}`;
            else query = `${query}&DateFrom=${info.dateFrom}`;
        }

        if (info.dateTo) {
            if (query) query = `DateTo=${info.dateTo}`;
            else query = `${query}&DateTo=${info.dateTo}`;
        }

        if (query) endpoint = `${endpoint}?${query}`;

        return super.getXls(endpoint);
    }
}