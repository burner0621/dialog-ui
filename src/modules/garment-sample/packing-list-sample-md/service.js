import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-shipping/packing-lists';
const shippingStaffUri = 'master/garment-shipping-staffs';
const invoiceServiceUri = 'garment-shipping/invoices';

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

    getPdfById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.getPdf(endpoint);
    }
    
    getInvoiceByPLNo(info) {
        var endpoint = `${invoiceServiceUri}`;
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

const sectionServiceUri = "master/garment-sections";
const UnitServiceUri = "master/units";
const uomServiceUri = 'master/uoms';
class CoreService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "core");
    }

    getSectionById(id) {
        var endpoint = `${sectionServiceUri}/${id}`;
        return super.get(endpoint);
    }

    getStaffIdByName(name) {
        var endpoint = `${shippingStaffUri}`;
        return super.list(endpoint, name);
    }

    getSampleUnit(info) {
        var endpoint = `${UnitServiceUri}`;
        return super.list(endpoint, info);
    }

    getUom(info) {
        var endpoint = `${uomServiceUri}`;
        return super.list(endpoint, info);
    }
}

const garmentSampleRequestUri = "garment-sample-requests";

class GarmentProductionService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "garment-production");
    }

    getSampleRequestById(id) {
        var endpoint = `${garmentSampleRequestUri}/${id}`;
        return super.get(endpoint);
    }
}

export { Service, SalesService, CoreService, GarmentProductionService }
