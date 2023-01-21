import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../../utils/rest-service'; 

const serviceUri = 'spinning/winding/reports/daily-production';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production");
    }

    getDailySpinningProductionReport(firstDay, lastDay, unitId) {
        var endpoint = `${serviceUri}`;
        var query = '';

        if (firstDay) {
            if (query == '') query = `firstDay=${firstDay}`;
            else query = `${query}&firstDay=${firstDay}`;
        }
        if (lastDay) {
            if (query == '') query = `lastDay=${lastDay}`;
            else query = `${query}&lastDay=${lastDay}`;
        }
        if (unitId) {
            if (query == '') query = `unitId=${unitId}`;
            else query = `${query}&unitId=${unitId}`;
        }

        if (query != '')
            endpoint = `${serviceUri}?${query}`;

        return super.get(endpoint);
    }
}