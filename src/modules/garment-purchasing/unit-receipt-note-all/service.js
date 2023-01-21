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

    getDOItemsById(id) {
        var endpoint = `${serviceUri}/do-items/${id}`;
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
        var endpoint = `${serviceUri}/deleted/${data.Id}`;
        return super.put(endpoint, data);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }

    getPurchaseRequestById(id, select) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("garment-purchasing");
        var _serviceUri = `purchase-requests/by-user/${id}`;

        return _endpoint.find(_serviceUri, { "select": select })
            .then(result => {
                return result.data;
            });
    }
     getStorageById(id, select) {
         var config = Container.instance.get(Config);
         var _endpoint = config.getEndpoint("core");
         var _serviceUri = `master/storages/${id}`;
        return _endpoint.find(_serviceUri)
             .then(result => {
                return result.data;
             });
     }

     getUnitDOById(id) {
        var endpoint = `${UnitDOserviceUri}/${id}`;
        return super.get(endpoint);
    }

    getUENById(id) {
        var endpoint = `${UENserviceUri}/${id}`;
        return super.get(endpoint);
    }

    getDRById(id) {
        var config = Container.instance.get(Config);
        var _endpoint = config.getEndpoint("garment-production");
        const resource = `delivery-returns/${id}`;
        return _endpoint.find(resource)
            .then(result => {
                return result.data;
            });
    }

    getCorrection(info){
        var endpoint = `${CorrectionServiceUri}`;
        return super.list(endpoint, info);
    }

    searchPR(info) {
        var endpoint = `${PRItemServiceUri}`;
        return super.list(endpoint, info);
    }
    getPRById(id){
        var endpoint = `${PRServiceUri}/${id}`;
        return super.get(endpoint);
    }
}

const FabricServiceUri = 'garment/leftover-warehouse-expenditures/fabric';
const AccServiceUri = 'garment/leftover-warehouse-expenditures/accessories';
const stockServiceUri = 'garment/leftover-warehouse-stocks';

class InventoryService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "inventory-azure");
    }

    getFabricById(id) {
        var endpoint = `${FabricServiceUri}/${id}`;
        return super.get(endpoint);
    }

    getAccById(id) {
        var endpoint = `${AccServiceUri}/${id}`;
        return super.get(endpoint);
    }

    getStockById(id){
        var endpoint = `${stockServiceUri}/${id}`;
        return super.get(endpoint);
    }
}

export { Service, InventoryService }