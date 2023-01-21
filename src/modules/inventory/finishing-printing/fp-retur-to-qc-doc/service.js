import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'finishing-printing/inventory/fp-retur-to-qc-docs';
const productUri = 'inventory/products-by-production-orders';

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

    getPdfById(id) {
        var endpoint = `${serviceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }

    getProductByKeyword(keyword) {
        var config = Container.instance.get(Config);
        var uri = `${productUri}/${keyword}`;

        var endpoint = config.getEndpoint("inventory");
        var _info = Object.assign({}, info);

        if (_info.order && typeof _info.order === "object")
            _info.order = JSON.stringify(_info.order);
        else
            delete _info.order;

        var promise = endpoint.find(uri, _info);
        this.publish(promise);
        return promise
            .then((result) => {
                this.publish(promise);
                return Promise.resolve(result);
            });
    }

    getProductByProductionOrderNo(productionOrderNo) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/products/byProductionOrderNo`;

        return _endpoint.find(_serviceUri, { productionOrderNo: productionOrderNo })
            .then(result => {
                return result;
            });
    }

    getProductById(id, select) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/products/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    getInventoryItemsByProductId(productIds) {

        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("inventory-azure");
        var _serviceUri = `inventory/inventory-summary-reports/productIds`;
        return _endpoint.find(_serviceUri, { productIds: JSON.stringify(productIds) })
            .then(result => {
                return result.data;
            });
    }

    getConstructionById(id, select) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/material-constructions/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }
}