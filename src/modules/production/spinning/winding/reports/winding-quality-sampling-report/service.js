import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../../../utils/rest-service';

const serviceUri = 'spinning/winding/reports/winding-quality-samplings';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production");
    }

    getByDate(sdate, edate, spinning, machine, uster, grade) {
        var endpoint = `${serviceUri}`;
        var query = '';
        if (sdate) {
            if (query == '') query = `dateFrom=${sdate}`;
            else query = `${query}&dateFrom=${sdate}`;
        }
        if (edate) {
            if (query == '') query = `dateTo=${edate}`;
            else query = `${query}&dateTo=${edate}`;
        }
        if (spinning) {
            if (query == '') query = `spinning=${spinning._id}`;
            else query = `${query}&spinning=${spinning._id}`;
        }
        if (machine) {
            if (query == '') query = `machine=${machine._id}`;
            else query = `${query}&machine=${machine._id}`;
        }
        if (uster) {
            if (query == '') query = `uster=${uster._id}`;
            else query = `${query}&uster=${uster._id}`;
        }
        if (grade) {
            if (query == '') query = `grade=${grade}`;
            else query = `${query}&grade=${grade}`;
        }
        if (query != '')
            endpoint = `${serviceUri}?${query}`;

        return super.get(endpoint);
    }

    generateExcel(sdate, edate, spinning, machine, uster, grade) {
        var endpoint = `${serviceUri}`;
        var query = '';
        if (sdate) {
            if (query == '') query = `dateFrom=${sdate}`;
            else query = `${query}&dateFrom=${sdate}`;
        }
        if (edate) {
            if (query == '') query = `dateTo=${edate}`;
            else query = `${query}&dateTo=${edate}`;
        }
        if (spinning) {
            if (query == '') query = `spinning=${spinning._id}`;
            else query = `${query}&spinning=${spinning._id}`;
        }
        if (machine) {
            if (query == '') query = `machine=${machine._id}`;
            else query = `${query}&machine=${machine._id}`;
        }
        if (uster) {
            if (query == '') query = `uster=${uster._id}`;
            else query = `${query}&uster=${uster._id}`;
        }
        if (grade) {
            if (query == '') query = `grade=${grade}`;
            else query = `${query}&grade=${grade}`;
        }
        if (query != '')
            endpoint = `${serviceUri}?${query}`;

        return super.getXls(endpoint);
    }
}