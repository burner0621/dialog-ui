import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
// import { Container } from 'aurelia-dependency-injection';
// import { Config } from "aurelia-api";

const serviceUriPreparing = 'preparings';
const hOrderKodeByNoServiceUri = 'local-merchandiser/horders/kode-by-no';
const costCalculationServiceUri = 'cost-calculation-garments';
const serviceUriCutting= 'cutting-outs/complete';
const serviceUriLoading= 'loadings/complete';
const serviceUriSewing = 'sewing-outs/complete';
const serviceUriFinishing = 'finishing-outs/complete';
const serviceUriExpenditure = 'expenditure-goods/complete';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    searchPreparing(info) {
        var endpoint = `${serviceUriPreparing}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUriPreparing}/${id}`;
        return super.get(endpoint);
    }

    searchCutting(info) {
        var endpoint = `${serviceUriCutting}`;
        return super.list(endpoint, info);
    }

    searchLoading(info) {
        var endpoint = `${serviceUriLoading}`;
        return super.list(endpoint, info);
    }

    searchSewing(info) {
        var endpoint = `${serviceUriSewing}`;
        return super.list(endpoint, info);
    }

    searchFinishing(info) {
        var endpoint = `${serviceUriFinishing}`;
        return super.list(endpoint, info);
    }

    searchExpenditure(info) {
        var endpoint = `${serviceUriExpenditure}`;
        return super.list(endpoint, info);
    }
}

export class SalesService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    getCostCalculationByRONo(info) {
        var endpoint = `${costCalculationServiceUri}`;
        return super.list(endpoint, info);
    }

    getHOrderKodeByNo(info) {
        var endpoint = `${hOrderKodeByNoServiceUri}`;
        return super.list(endpoint, info);
    }
}