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
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    revise(data, revisedate){
        var endpoint = `${serviceUri}/revisedate-uen/${revisedate}`;
        return super.post(endpoint, data);
    }

    
}

export { Service}