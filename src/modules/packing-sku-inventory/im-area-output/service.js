import { RestService } from '../../../utils/rest-service';
const serviceUri = 'output-inspection-material';
const ccServiceUri = 'sales/finishing-printing-cost-calculations';
export class Service extends RestService {

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
        var endpoint = `${serviceUri}/pdf/${id}`;
        return super.getPdf(endpoint);
    }

    generateExcel(id) {
        var endpoint = `${serviceUri}/xls/${id}`;
        return super.getXls(endpoint);
    }

    getProductionOrderInput() {
        var endpoint = `${serviceUri}/input-production-orders`;

        return super.get(endpoint);
    }

    getProductionOrderInputById(productionOrderId) {
        var endpoint = `${serviceUri}/input-production-orders?productionOrderId=${productionOrderId}`;

        return super.get(endpoint);
    }

    generateExcelAll(info) {
        var endpoint = `${serviceUri}/xls?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}