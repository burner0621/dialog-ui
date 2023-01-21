import { RestService } from '../../../utils/rest-service';

const serviceUri = 'garment-shipping/packing-lists';

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
        var endpoint = `${serviceUri}/draft`;
        return super.post(endpoint, data);
    }

    update(data) {
        var endpoint = `${serviceUri}/draft/${data.id}`;
        return super.put(endpoint, data);
    }

    delete(data) {
        var endpoint = `${serviceUri}/${data.id}`;
        return super.delete(endpoint, data);
    }

    getPdfById(id) {
        var endpoint = `${serviceUri}/draft/${id}`;
        return super.getPdf(endpoint);
    }

    getPdfByFilterCarton(id) {
        var endpoint = `${serviceUri}/draft/${id}/carton`;
        return super.getPdf(endpoint);
    }

    getExcelById(id) {
        var endpoint = `${serviceUri}/draft/${id}`;
        return super.getXls(endpoint);
    }

    getExcelByFilterCarton(id) {
        var endpoint = `${serviceUri}/draft/${id}/carton/xls`;
        return super.getXls(endpoint);
    }


    postBooking(id) {
        var endpoint = `${serviceUri}/draft/post-booking/${id}`;
        return super.put(endpoint);
    }

    unpostBooking(id) {
        var endpoint = `${serviceUri}/draft/unpost-booking/${id}`;
        return super.put(endpoint);
    }

    postPackingList(id) {
        var endpoint = `${serviceUri}/draft/post-packing-list/${id}`;
        return super.put(endpoint);
    }

    unpostPackingList(id) {
        var endpoint = `${serviceUri}/draft/unpost-packing-list/${id}`;
        return super.put(endpoint);
    }

    createCopy(data) {
        var endpoint = `${serviceUri}/draft/copy`;
        return super.post(endpoint, data);
    }
}

const costCalculationServiceUri = 'cost-calculation-garments';
const SalesContractserviceUri = "merchandiser/garment-sales-contracts";
const PreSalesContractserviceUri = "merchandiser/garment-pre-sales-contracts";
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

    getPreSalesContractById(id) {
        var endpoint = `${PreSalesContractserviceUri}/${id}`;
        return super.get(endpoint);
    }


}

const sectionServiceUri = "master/garment-sections";
class CoreService extends RestService {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "core");
    }

    getSectionById(id) {
        var endpoint = `${sectionServiceUri}/${id}`;
        return super.get(endpoint);
    }
}

export { Service, SalesService, CoreService }