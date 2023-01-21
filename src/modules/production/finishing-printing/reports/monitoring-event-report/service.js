import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../utils/rest-service';

const serviceUri = 'finishing-printing/monitoring-event-reports';
const machineServiceUri = 'finishing-printing/reports/monitoring-specification-machine/by-event';
var moment = require('moment');
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        var endpoint = this._getEndPoint(info);
        return super.getXls(endpoint);
    }

    _getEndPoint(info) {
        var endpoint = `${serviceUri}/download`;
        var query = '';
        if (info.machineId) {
            if (query === '') query = `machineId=${info.machineId}`;
            else query = `${query}&machineId=${info.machineId}`;
        }
        if (info.machineEventId) {
            if (query === '') query = `machineEventId=${info.machineEventId}`;
            else query = `${query}&machineEventId=${info.machineEventId}`;
        }
        if (info.productionOrderNumber) {
            if (query === '') query = `productionOrderNumber=${info.productionOrderNumber}`;
            else query = `${query}&productionOrderNumber=${info.productionOrderNumber}`;
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
            endpoint = `${serviceUri}/download?${query}`;

        return endpoint;
    }

    getMachine(info) {
        console.log(info);
        var query = '';
        query = `id=${info.machineId}&productionOrderNumber=${info.productionOrderNumber}&dateTime=${info.date}`;

        var endpoint = `${serviceUri}/monitoringSpecMachine?${query}`;
        return super.get(endpoint);
    }
}