
import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'sales/reports/sales-monthly-report';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production");
    }

    getSalesMonthlyReport(info) {
        var endpoint = `${serviceUri}`;
        var query = '';
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        var endpoint = `${serviceUri}`;
        if (typeof info.filter === "string")
            endpoint = `${serviceUri}?${info.filter}`;
        return super.getXls(endpoint);
    }
}
