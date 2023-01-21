import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'fp-return-from-buyers';
const productUri = 'inventory/product-shipment-by-production-order';

export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory-azure");
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

    getStorageById(id) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("core");
        var _serviceUri = `master/storages/${id}`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });

    }

    getShipmentProducts(productionOrderId, buyerId) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("production-azure");
        var _serviceUri = `finishing-printing/inventory/fp-shipment-documents/shipment-products`;

        return _endpoint.find(_serviceUri)
            .then(result => {
                return result.data;
            });

    }

    getProductShipment(orderNo, buyer) {
        var endpoint = `${productUri}?orderNo=${orderNo}&buyer=${buyer}`;
        return super.get(endpoint);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }
}

export class FinishingPrintingService extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "production-azure");
    }

    getShipmentProducts(productionOrderId, buyerId) {
        var endpoint = `finishing-printing/inventory/fp-shipment-documents/shipment-products`;

        var info = {
            productionOrderId: productionOrderId,
            buyerId: buyerId
        }

        return super.list(endpoint, info)
            .then(result => {
                return result.data;
            });
    }
}