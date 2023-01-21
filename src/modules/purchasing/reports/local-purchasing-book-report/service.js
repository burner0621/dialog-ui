import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'report/local-purchasing-book-reports';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        // var endpoint = `${serviceUri}?isValas=false&no=${info.no}&category=${info.category}&unit=${info.unit}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        var endpoint = `${serviceUri}?isValas=false&no=${info.no}&accountingUnitId=${info.accountingUnitId}&accountingCategoryId=${info.accountingCategoryId}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&divisionId=${info.divisionId}`;
        return super.get(endpoint);

    }

    generateExcel(info) {
        // var endpoint = `${serviceUri}/download?isValas=false&no=${info.no}&category=${info.category}&unit=${info.unit}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        var endpoint = `${serviceUri}/download?isValas=false&no=${info.no}&accountingUnitId=${info.accountingUnitId}&accountingCategoryId=${info.accountingCategoryId}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&divisionId=${info.divisionId}`;
        return super.getXls(endpoint);
    }

    printPdf(info) {
        // var endpoint = `${serviceUri}/pdf?isValas=false&no=${info.no}&category=${info.category}&unit=${info.unit}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        var endpoint = `${serviceUri}/pdf?isValas=false&no=${info.no}&accountingUnitId=${info.accountingUnitId}&accountingCategoryId=${info.accountingCategoryId}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&divisionId=${info.divisionId}`;
        return super.getPdf(endpoint);
    }
}