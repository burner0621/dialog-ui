import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'finishing-printing/packing-receipt';
// const packingUnacceptedServiceUri = 'finishing-printing/quality-control/packings-unaccepted';
// const packingServiceUri = 'finishing-printing/quality-control/packings';
// const packingReceiptUnvoidServiceUri = 'inventory/packing-receipts-unvoid';
const serviceUriCore = 'master/products';
const serviceUriCoreUom = 'master/uoms';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    create(data) {
        var endpoint = `${serviceUri}`;
        return super.post(endpoint, data);
    }

    update(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.Id}`;
        return super.delete(endpoint, data);
    }
    getPR(id) {
        var endpoint = `${serviceUriPr}/${id}`;
        return super.get(endpoint);
    }

    // searchPacking(info) {
    //     var endpoint = `${packingServiceUri}`;
    //     return super.list(endpoint, info);
    // }

    // searchUnacceptedPacking(info) {
    //     var endpoint = `${packingUnacceptedServiceUri}`;
    //     return super.list(endpoint, info);
    // }

    // getPackingById(id) {
    //     var endpoint = `${packingServiceUri}/${id}`;
    //     return super.get(endpoint);
    // }

    // getPackingUnacceptedById(id) {
    //     var endpoint = `${packingUnacceptedServiceUri}/${id}`;
    //     return super.get(endpoint);
    // }

    searchUnvoid(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }
}


export class ServiceProduct extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    searchProduct(info) {
        var endpoint = `${serviceUriCore}`;
        return super.list(endpoint, info);
    }

    searchProductByName(info) {
        var endpoint = `${serviceUriCore}/by-name`;
        return super.list(endpoint, info);
    }

    searchUom(info) {
        var endpoint = `${serviceUriCoreUom}`;
        return super.list(endpoint, info);
    }
}