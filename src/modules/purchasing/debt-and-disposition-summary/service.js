import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'reports/debt-and-disposition-summaries';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    searchLocal(info) {
        var endpoint = `${serviceUri}?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dueDate=${info.dueDate}&isImport=false&isForeignCurrency=false`;
        return super.get(endpoint);
    }

    searchLocalForeignCurrency(info) {
        var endpoint = `${serviceUri}?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dueDate=${info.dueDate}&isImport=false&isForeignCurrency=true`;
        return super.get(endpoint);
    }

    searchImport(info) {
        var endpoint = `${serviceUri}?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dueDate=${info.dueDate}&isImport=true&isForeignCurrency=false`;
        return super.get(endpoint);
    }

    generateExcelLocal(info) {
        var endpoint = `${serviceUri}/download-excel?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dueDate=${info.dueDate}&isImport=false&isForeignCurrency=false`;
        return super.getXls(endpoint);
    }

    generateExcelLocalForeignCurrency(info) {
        var endpoint = `${serviceUri}/download-excel?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dueDate=${info.dueDate}&isImport=false&isForeignCurrency=true`;
        return super.getXls(endpoint);
    }

    generateExcelImport(info) {
        var endpoint = `${serviceUri}/download-excel?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dueDate=${info.dueDate}&isImport=true&isForeignCurrency=false`;
        return super.getXls(endpoint);
    }

    printPdfLocal(info) {
        var endpoint = `${serviceUri}/download-pdf?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dueDate=${info.dueDate}&isImport=false&isForeignCurrency=false`;
        return super.getPdf(endpoint);
    }

    printPdfLocalForeignCurrency(info) {
        var endpoint = `${serviceUri}/download-pdf?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dueDate=${info.dueDate}&isImport=false&isForeignCurrency=true`;
        return super.getPdf(endpoint);
    }

    printPdfImport(info) {
        var endpoint = `${serviceUri}/download-pdf?categoryId=${info.categoryId}&accountingUnitId=${info.accountingUnitId}&divisionId=${info.divisionId}&dueDate=${info.dueDate}&isImport=true&isForeignCurrency=false`;
        return super.getPdf(endpoint);
    }
}