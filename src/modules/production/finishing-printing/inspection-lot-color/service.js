import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'finishing-printing/inspection-lot-colors';
// const kanbanServiceUri = 'finishing-printing/kanbans';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production");
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
        var endpoint = `${serviceUri}/${data._id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    }

    getByCode(code) {
        var endpoint = `${serviceUri}?keyword=${code}`;
        return super.get(endpoint);
    }

    // searchKanban(info) {
    //     var endpoint = `${kanbanServiceUri}`;
    //     return super.list(endpoint, info);
    // }

    // getKanbanById(id) {
    //     var endpoint = `${kanbanServiceUri}/${id}`;
    //     //"productionOrder.orderNo","productionOrder.orderType.name", "productionOrder.material", "productionOrder.materialConstruction", "productionOrder.materialWidth"
    //     return super.get(endpoint);
    // }

    // getPdfById(id) {
    //     var endpoint = `${serviceUri}/${id}`;
    //     return super.getPdf(endpoint);
    // }
}