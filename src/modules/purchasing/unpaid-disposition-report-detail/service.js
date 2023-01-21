import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

// const serviceUri = 'reports/debt-and-disposition-summaries';
const serviceUri = 'unpaid-disposition-report/detail';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dateTo=${info.dateTo}&isImport=${info.isImport}&isForeignCurrency=${info.isValas}`;
        return super.get(endpoint);
    }

    generateExcel(info) {
        var endpoint = `${serviceUri}/download-excel?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dateTo=${info.dateTo}&isImport=${info.isImport}&isForeignCurrency=${info.isValas}`;
        return super.getXls(endpoint);
    }

    generatePdf(info) {
        var endpoint = `${serviceUri}/download-pdf?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dateTo=${info.dateTo}&isImport=${info.isImport}&isForeignCurrency=${info.isValas}`;
        return super.getPdf(endpoint);
    }
}