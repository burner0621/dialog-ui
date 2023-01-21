import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'finishing-printing/quality-control/packings';
const productionOrderServiceUri = 'sales/production-orders';
const buyerServiceUri = "master/buyers";
const materialConstructionServiceUri = "master/material-constructions";

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

    getByCode(code) {
        var endpoint = `${serviceUri}?keyword=${code}`;
        return super.get(endpoint);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/pdf/${id}`;
        console.log(endpoint);
        return super.getPdf(endpoint);
    }
}

export class ServiceSales extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "sales");
    }

    searchProductionOrder(info) {
        var endpoint = `${productionOrderServiceUri}`;
        return super.list(endpoint, info);
    }

    getProductionOrderById(id, select) {
        var endpoint = `${productionOrderServiceUri}/${id}`;
        //"productionOrder.orderNo","productionOrder.orderType.name", "productionOrder.material", "productionOrder.materialConstruction", "productionOrder.materialWidth"
        var info = { select: select };
        return super.get(endpoint, null, info);
    }
}

export class ServiceCore extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    searchBuyer(info) {
        var endpoint = `${buyerServiceUri}`;
        return super.list(endpoint, info);
    }

    getBuyerById(id, select) {
        var endpoint = `${buyerServiceUri}/${id}`;
        var info = { select: select };
        return super.get(endpoint, null, info);
    }

    searchMaterialConstruction(info) {
        var endpoint = `${materialConstructionServiceUri}`;
        return super.list(endpoint, info);
    }

    getMaterialConstructionById(id, select) {
        var endpoint = `${materialConstructionServiceUri}/${id}`;
        var info = { select: select };
        return super.get(endpoint, null, info);
    }
}