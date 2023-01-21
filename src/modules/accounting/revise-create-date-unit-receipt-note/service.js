import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";


const serviceUri = 'garment-unit-receipt-notes';
const UnitDOserviceUri = 'garment-unit-delivery-orders';
const UENserviceUri = 'garment-unit-expenditure-notes';
const CorrectionServiceUri='garment-correction-quantity-notes';
const PRItemServiceUri = 'garment-purchase-requests/items';
const PRServiceUri = 'garment-purchase-requests';

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
        var endpoint = `${serviceUri}/revisedate-urn/${revisedate}`;
        return super.post(endpoint, data);
    }
    
}


export { Service}