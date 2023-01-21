import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
// import { Container } from 'aurelia-dependency-injection';
// import { Config } from "aurelia-api";
const unitExpenditureNoteUri = 'garment-unit-expenditure-notes';
const unitDeliveryOrderUri = 'garment-unit-delivery-orders';
const preparingUri = 'preparings';
const serviceUri = 'delivery-returns';
export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
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

    getPreparingByUENNo(info){
        var endpoint = `${preparingUri}`;
        return super.list(endpoint, info);
    }

}

    
export class PurchasingService extends RestService {

    constructor(http, aggregator, config, endpoint){
        super(http, aggregator, config, "purchasing-azure")
    }

    getExpenditureNote(info) {
        var endpoint = `${unitExpenditureNoteUri}`;
        return super.list(endpoint, info);
    }
}