import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
const serviceUri = 'garment-shipping/invoices';
const resourceStockUri = 'garment-shipping/packing-lists';
 
import { Config } from "aurelia-api";
class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "packing-inventory");
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
        var endpoint = `${serviceUri}/${data.id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.id}`;
        return super.delete(endpoint, data);
    }

    getPackingListById(id) {
        var endpoint = `${resourceStockUri}/${id}`;
        return super.get(endpoint);
    }

    getPdfById(id, type) {
        var endpoint = `${serviceUri}/pdf/${id}/${type}`;
        return super.getPdf(endpoint);
    }

    getPdfWHById(id, type) {
        var endpoint = `${serviceUri}/whpdf/${id}/${type}`;
        return super.getPdf(endpoint);
    }

    getInvoiceNo(info) {
        var endpoint = `${resourceStockUri}`;
        return super.list(endpoint, info);
    }
  
}

const costCalculationServiceUri = 'cost-calculation-garments';
const SalesContractserviceUri = "merchandiser/garment-sales-contracts";
class SalesService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "sales");
    }

    getCostCalculationById(id) {
        var endpoint = `${costCalculationServiceUri}/${id}`;
        return super.get(endpoint);
    }

    getSalesContractById(id) {
        var endpoint = `${SalesContractserviceUri}/${id}`;
        return super.get(endpoint);
    }
}
const coreserviceUri = "master/account-banks";
const serviceUriBuyer = 'master/garment-buyers';
class CoreService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "core");
    }

    getBankAccountById(id) {
        var endpoint = `${coreserviceUri}/${id}`;
        return super.get(endpoint);
    }

    getBuyerById(id) {
        var endpoint = `${serviceUriBuyer}/${id}`;
        return super.get(endpoint);
    }

    
}

export { Service, SalesService,CoreService}