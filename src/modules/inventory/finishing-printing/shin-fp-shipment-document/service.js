import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";


const serviceUri = "finishing-printing/inventory/fp-shipment-documents/new";
const inventoryServiceUri = "inventory/inventory-summary";
const productServiceUri = "master/product";

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
        var endpoint = `${serviceUri}/${data._id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data._id}`;
        return super.delete(endpoint, data);
    }

    searchProducts(info) {
        var endpoint = `${productServiceUri}`;
        return super.list(endpoint, info);
    }

    searchInventory(info) {
        var endpoint = `${inventoryServiceUri}`;
        return super.list(endpoint, info);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }

    searchPackingReceipts(info) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("production-azure");
        var _serviceUri = `finishing-printing/packing-receipt`;

        return _endpoint.find(_serviceUri, info)
            .then(result => {
                return result.data;
            });
    }

    getSummaryByParams(storageId, productId, uomId) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("inventory-azure");
        var _serviceUri = `inventory/inventory-summary-reports/${storageId}/${productId}/${uomId}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    searchProducts(id) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/products/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    getProductById(id) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/products/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    getBuyerById(id, select) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/buyers/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    getProductionOrderById(id, select) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("production");
        var _serviceUri = `sales/production-orders/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    getPackingByProductName(productName) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("production-azure");
        var _serviceUri = `finishing-printing/quality-control/packings/details/by-product-name?productName=${productName}`;

        var info = {
            productName: productName
        }

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

    searchDOSales(info) {
        var endpoint = `sales/do-sales`;
        return super.list(endpoint, info);
    }

    getDOSalesById(id) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("sales");
        var _serviceUri = `sales/do-sales/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });
    }

}