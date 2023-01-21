import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
import { debug } from 'util';
var moment = require('moment');

const serviceUri = 'SpinningInputProduction';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "spinning");
    }

    // search(info) {
    //     var endpoint = `${serviceUri}`;
    //     return super.list(endpoint, info);
    // }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    search(info) {
        var yarn = info.Filter.YarnName ? info.Filter.YarnName :"all";
        var spinning = info.Filter.UnitName ? info.Filter.UnitName : "all";
        var dateFrom = info.Filter.DateFrom ? info.Filter.DateFrom : " ";
        var dateTo = info.Filter.DateTo ? info.Filter.DateTo : " ";
        var endpoint = `${serviceUri}/report/${spinning}/${yarn}/${dateFrom}/${dateTo}`;
        return super.get(endpoint);
    }

    generateExcel(info) {
        var yarn = info.Filter.YarnName ? info.Filter.YarnName :"all"; 
        var spinning = info.Filter.UnitName ? info.Filter.UnitName : "all";
        var dateFrom = info.Filter.DateFrom ? info.Filter.DateFrom : " ";
        var dateTo = info.Filter.DateTo ? info.Filter.DateTo : " ";
        var endpoint = `${serviceUri}/download/${spinning}/${yarn}/${dateFrom}/${dateTo}`;
        return super.getXls(endpoint);
    }


}