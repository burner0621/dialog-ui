import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";
import moment from 'moment';

const serviceUri = 'garment-unit-delivery-orders';
const doItemsUri = 'garment-do-items/unit-delivery-order';
const doItemsMoreUri = 'garment-do-items/unit-delivery-order/more';
const garmentEPOServiceUri = 'garment-external-purchase-orders/unit-do/by-ro';
const garmentURNforUnitDO = 'garment-unit-receipt-notes/unit-delivery-order';

class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}/by-user`;
        return super.list(endpoint, info);
    }

    searchDOItems(info) {
        var endpoint = `${doItemsUri}`;
        return super.list(endpoint, info);
    }

    searchMoreDOItems(info) {
        var endpoint = `${doItemsMoreUri}`;
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

    getPdfById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }

    searchUnitReceiptNote(info) {
        var endpoint = `${unitReceiptNoteUri}`;
        return super.list(endpoint, info);
    }

    getGarmentEPOByRONo(info) {
        var endpoint = `${garmentEPOServiceUri}`;
        return super.list(endpoint, info);
    }

    getgarmentURNforUnitDO(info) {
        var endpoint = `${garmentURNforUnitDO}`;
        return super.list(endpoint, info);
    }
}

const UnitServiceUri = 'master/units';
class CoreService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "core");
    }

    getSampleUnit(info) {
        var endpoint = `${UnitServiceUri}`;
        return super.list(endpoint, info);
    }
}

const sampleServiceUri = 'garment-sample-requests';
class ProductionService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "garment-production");
    }

    searchSampleComplete(id) {
        var endpoint = `${sampleServiceUri}/${id}`;
        return super.get(endpoint);
    }
}
export { Service, CoreService, ProductionService }