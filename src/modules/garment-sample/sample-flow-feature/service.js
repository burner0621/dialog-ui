import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
// import { Container } from 'aurelia-dependency-injection';
// import { Config } from "aurelia-api";

const serviceUriPreparing = 'garment-sample-preparings';
const hOrderKodeByNoServiceUri = 'local-merchandiser/horders/kode-by-no';
const serviceUriSampleRequest = 'garment-sample-requests/complete';
const serviceUriCutting= 'garment-sample-cutting-outs/complete';
 
const serviceUriSewing = 'garment-sample-sewing-outs/complete';
const serviceUriFinishing = 'garment-sample-finishing-outs/complete';
const serviceUriExpenditure = 'garment-sample-expenditure-goods/complete';

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
    getSampleRequestRONo(info) {
        var endpoint = `${serviceUriSampleRequest}`;
        return super.list(endpoint, info);
    }

}

export class SalesService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    getSampleRequestRONo(info) {
        var endpoint = `${serviceUriSampleRequest}`;
        return super.list(endpoint, info);
    }

    getHOrderKodeByNo(info) {
        var endpoint = `${hOrderKodeByNoServiceUri}`;
        return super.list(endpoint, info);
    }
}