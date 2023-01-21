import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
import moment from 'moment';

const serviceUri = 'garment-unit-expenditure-notes';
const unitDeliveryOrder = 'garment-unit-receipt-notes/unit-delivery-order-header';
const URNServiceUri = 'garment-unit-receipt-notes';
const unitDOServiceUri= 'garment-unit-delivery-orders';


class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}/by-user`;
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

    getPdfById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }

    searchUnitReceiptNote(info) {
        var endpoint = `${URNServiceUri}`;
        return super.list(endpoint, info);
    }

    getUENById(id) {
        var endpoint = `${serviceUri}/by-unit-expenditure-note/${id}`;
        return super.get(endpoint);
    }

    getUnitDOId(id) {
        var endpoint = `${unitDOServiceUri}/${id}`;
        return super.get(endpoint);
    }

    searchUnitDO(info) {
        var endpoint = `${unitDOServiceUri}`;
        return super.list(endpoint, info);
    }
}

const resource = 'delivery-returns';
class ProductionService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "garment-production");
    }
    getGarmentDR(info) {
        var endpoint = `${resource}`;
        return super.list(endpoint, info);
    }
}

export { Service,ProductionService }